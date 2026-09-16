import { useState } from 'react';
import { shuffleColors } from '../data/colors';
import { meta } from '../data/utils';

function genId(name) {
  return 's_' + name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 8) + '_' + Date.now().toString(36);
}

export default function SubjectManager({
  subjects,
  setSubjects,
  ACTS,
  setACTS,
  grid,
  setGrid,
  custom,
  setCustom,
  colorPool,
  setColorPool
}) {
  const [newName, setNewName] = useState('');
  const [newCred, setNewCred] = useState(3);
  const [listOpen, setListOpen] = useState(false);

  function nextColor() {
    const used = subjects.map(s => s.color);
    const available = colorPool.filter(c => !used.includes(c));
    if (available.length > 0) return available[0];
    const newPool = shuffleColors();
    setColorPool(newPool);
    return newPool[0];
  }

  function addSubject() {
    if (!newName.trim()) return;
    const id = genId(newName);
    const color = nextColor();
    const m = newCred * 3;
    const syncH = Math.floor(m * 0.4);
    const newSubj = { id, name: newName.trim(), credits: newCred || 3, syncHours: syncH, color };
    const newActs = {
      ...ACTS,
      [id + '-s']: { label: 'Sincrónica ' + newName.trim(), subject: id, kind: 'S' },
      [id + '-a']: { label: 'Asincrónica ' + newName.trim(), subject: id, kind: 'A' }
    };
    setSubjects(prev => [...prev, newSubj]);
    setACTS(newActs);
    setNewName('');
    setNewCred(3);
  }

  function removeSubject(id) {
    const newSubjs = subjects.filter(s => s.id !== id);
    const newActs = { ...ACTS };
    delete newActs[id + '-s'];
    delete newActs[id + '-a'];
    const newGrid = { ...grid };
    const newCustom = { ...custom };
    for (const k in newGrid) {
      if (newGrid[k] === id + '-s' || newGrid[k] === id + '-a') {
        delete newGrid[k];
        delete newCustom[k];
      }
    }
    setSubjects(newSubjs);
    setACTS(newActs);
    setGrid(newGrid);
    setCustom(newCustom);
  }

  function clearTemplate() {
    if (!confirm('¿Limpiar toda la plantilla? Se borrarán todas las materias y el horario.')) return;
    subjects.forEach(s => {
      const newActs = { ...ACTS };
      delete newActs[s.id + '-s'];
      delete newActs[s.id + '-a'];
      setACTS(newActs);
    });
    setSubjects([]);
    setGrid({});
    setCustom({});
    setColorPool(shuffleColors());
  }

  return (
    <section>
      <h2>Gestión de asignaturas</h2>
      <p className="sectnote">
        Limpia la plantilla y crea tus propias materias. Cada materia genera
        automáticamente sus actividades sincrónica y asincrónica en el horario.
      </p>
      <div className="tablecard" style={{ padding: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end', marginBottom: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: '.78rem', color: 'var(--ink-2)', marginBottom: 4 }}>
              Nombre de la materia
            </label>
            <input
              type="text"
              placeholder="Ej: Cálculo Diferencial"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addSubject()}
              style={{ padding: '7px 10px', border: '1px solid var(--rule)', borderRadius: 2, font: 'inherit', fontSize: '.88rem', width: 240 }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '.78rem', color: 'var(--ink-2)', marginBottom: 4 }}>
              Créditos
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={newCred}
              onChange={e => setNewCred(parseInt(e.target.value) || 3)}
              style={{ padding: '7px 10px', border: '1px solid var(--rule)', borderRadius: 2, font: 'inherit', fontSize: '.88rem', width: 60, textAlign: 'right' }}
            />
          </div>
          <button className="btn" onClick={addSubject} style={{ background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }}>
            + Agregar materia
          </button>
          <button className="btn" onClick={clearTemplate} style={{ marginLeft: 'auto', color: '#b33', borderColor: '#b33' }}>
            Limpiar plantilla
          </button>
        </div>

        <div style={{ fontSize: '.85rem', color: 'var(--ink-2)' }}>
          {subjects.length === 0 ? (
            <em>No hay materias creadas. Agrega una arriba.</em>
          ) : (
            <>
              <button
                onClick={() => setListOpen(!listOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                  width: '100%', border: '1px solid var(--rule)', borderRadius: 2,
                  background: 'var(--card)', font: 'inherit', fontSize: '.85rem',
                  color: 'var(--ink)', cursor: 'pointer', textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '.7rem', color: 'var(--ink-3)', transition: 'transform .2s', transform: `rotate(${listOpen ? '90' : '0'}deg)` }}>
                  ▶
                </span>
                {subjects.length} materia{subjects.length > 1 ? 's' : ''} asignada{subjects.length > 1 ? 's' : ''}
                <span style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                  {subjects.map(s => (
                    <span key={s.id} style={{ width: 10, height: 10, borderRadius: 2, background: s.color, display: 'inline-block' }} />
                  ))}
                </span>
              </button>
              {listOpen && (
                <div style={{ border: '1px solid var(--rule)', borderTop: 0, borderRadius: '0 0 2px 2px', overflow: 'hidden' }}>
                  {subjects.map(s => (
                    <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderBottom: '1px solid var(--rule-soft)', background: 'var(--card)' }}>
                      <span style={{ width: 12, height: 12, borderRadius: 2, background: s.color, flex: '0 0 auto' }} />
                      <span style={{ flex: 1, fontSize: '.85rem' }}>{s.name}</span>
                      <span style={{ fontSize: '.78rem', color: 'var(--ink-3)' }}>{s.credits}c · {meta(s).toFixed(0)}h/sem</span>
                      <button
                        onClick={() => removeSubject(s.id)}
                        style={{ background: 'none', border: '1px solid var(--rule)', borderRadius: 2, color: '#b33', cursor: 'pointer', fontSize: '.75rem', padding: '3px 8px' }}
                        title="Eliminar"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
