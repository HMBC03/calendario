import { useState, useRef } from 'react';
import { HORAS, DIAS } from '../data/constants';
import { key, actColor } from '../data/utils';

function Cell({ d, h, id, ACTS, subjects, custom, locked, active, onPaint, onEdit }) {
  const a = id ? ACTS[id] : null;
  const c = a ? actColor(ACTS, subjects, id) : null;
  const prevKey = key(d, h - 1);
  const isMid = custom[key(d, h)] ? false : (id && a && grid[prevKey] === id);

  function handleMouseDown(e) {
    if (locked) return;
    e.preventDefault();
    onPaint(d, h);
  }

  function handleMouseEnter() {
    if (!locked) onPaint(d, h, true);
  }

  function handleClick() {
    if (!locked) onPaint(d, h);
  }

  function handleDoubleClick(e) {
    if (locked || !a || a.kind === 'X') return;
    e.stopPropagation();
    onEdit(d, h, e.currentTarget.querySelector('.lbl'));
  }

  return (
    <div
      className={`cell${locked ? ' locked' : ''}${isMid ? ' mid' : ''}`}
      data-d={d}
      data-h={h}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {a && (
        <div
          className={`blk${a.kind === 'A' ? ' async' : ''}`}
          style={
            a.kind === 'A'
              ? { borderColor: c, color: 'var(--ink)' }
              : { background: c }
          }
          onDoubleClick={handleDoubleClick}
        >
          {a.kind !== 'X' && (
            <>
              <span className="lbl">{custom[key(d, h)] || a.label}</span>
              <span className="tag">{a.kind === 'S' ? 'S' : 'A'}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function Calendar({ subjects, ACTS, grid, setGrid, custom, setCustom, locked, active }) {
  const [painting, setPainting] = useState(false);
  const calRef = useRef(null);

  function paintCell(d, h, isDrag = false) {
    if (locked) return;
    if (isDrag && !painting) return;
    const k = key(d, h);
    const newGrid = { ...grid };
    const newCustom = { ...custom };
    if (active === null) {
      delete newGrid[k];
      delete newCustom[k];
    } else {
      newGrid[k] = active;
      delete newCustom[k];
    }
    setGrid(newGrid);
    setCustom(newCustom);
  }

  function handleEdit(d, h, el) {
    if (!el) return;
    const k = key(d, h);
    el.style.display = 'block';
    el.parentElement.contentEditable = 'true';
    el.parentElement.focus();
    document.execCommand && document.getSelection().selectAllChildren(el.parentElement);
    el.parentElement.onblur = () => {
      const newCustom = { ...custom };
      newCustom[k] = el.parentElement.innerText.trim();
      el.parentElement.contentEditable = 'false';
      setCustom(newCustom);
    };
  }

  function handleMouseDown() {
    setPainting(true);
  }

  function handleMouseUp() {
    if (painting) {
      setPainting(false);
    }
  }

  return (
    <div
      className="calwrap"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="cal" ref={calRef}>
        <div className="corner" />
        {DIAS.map((d, i) => {
          const acad = HORAS.filter(h => {
            const a = ACTS[grid[key(i, h)]];
            return a && a.subject;
          }).length;
          return (
            <div key={i} className="dh">
              <div className="d">{d}</div>
              <div className="s">{acad} h académicas</div>
            </div>
          );
        })}
        {HORAS.map(h => (
          <div key={h} style={{ display: 'contents' }}>
            <div className="hr-label">
              {String(h).padStart(2, '0')}:00
            </div>
            {[0, 1, 2, 3, 4, 5, 6].map(d => (
              <Cell
                key={`${d}-${h}`}
                d={d}
                h={h}
                id={grid[key(d, h)]}
                ACTS={ACTS}
                subjects={subjects}
                custom={custom}
                locked={locked}
                active={active}
                onPaint={paintCell}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
