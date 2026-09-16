import { actColor } from '../data/utils';

export default function Palette({
  subjects,
  ACTS,
  paletteMode,
  setPaletteMode,
  active,
  setActive,
  locked,
  setLocked
}) {
  const extraIds = ['trab', 'bien', 'esen'];

  function handleToggle(mode) {
    if (locked) return;
    setPaletteMode(prev => prev === mode ? null : mode);
    setActive(null);
  }

  function handleSelect(actId) {
    if (locked) return;
    setActive(actId);
    setPaletteMode(null);
  }

  return (
    <div className="palette">
      {/* Sincrónica dropdown */}
      <div className="palette-wrap">
        <button
          className="chip"
          type="button"
          aria-pressed={paletteMode === 'S'}
          onClick={() => handleToggle('S')}
        >
          <span className="key" style={{ background: 'var(--accent)' }} />
          Sincrónica
        </button>
        {paletteMode === 'S' && (
          <div className="dropdown">
            {locked ? (
              <div className="dd-title" style={{ color: '#b33' }}>🔒 Tablero bloqueado</div>
            ) : (
              <>
                <div className="dd-title">Selecciona la materia</div>
                {subjects.length === 0 && (
                  <div style={{ padding: '8px 10px', fontSize: '.82rem', color: 'var(--ink-3)' }}>
                    <em>No hay materias. Crea una arriba.</em>
                  </div>
                )}
                {subjects.map(s => (
                  <button
                    key={s.id}
                    className="dd-item"
                    type="button"
                    aria-pressed={active === s.id + '-s'}
                    onClick={() => handleSelect(s.id + '-s')}
                  >
                    <span className="dd-key" style={{ background: s.color }} />
                    {s.name}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Asincrónica dropdown */}
      <div className="palette-wrap">
        <button
          className="chip"
          type="button"
          aria-pressed={paletteMode === 'A'}
          onClick={() => handleToggle('A')}
        >
          <span className="key async" style={{ borderColor: 'var(--accent)' }} />
          Asincrónica
        </button>
        {paletteMode === 'A' && (
          <div className="dropdown">
            {locked ? (
              <div className="dd-title" style={{ color: '#b33' }}>🔒 Tablero bloqueado</div>
            ) : (
              <>
                <div className="dd-title">Selecciona la materia</div>
                {subjects.length === 0 && (
                  <div style={{ padding: '8px 10px', fontSize: '.82rem', color: 'var(--ink-3)' }}>
                    <em>No hay materias. Crea una arriba.</em>
                  </div>
                )}
                {subjects.map(s => (
                  <button
                    key={s.id}
                    className="dd-item"
                    type="button"
                    aria-pressed={active === s.id + '-a'}
                    onClick={() => handleSelect(s.id + '-a')}
                  >
                    <span className="dd-key async" style={{ borderColor: s.color }} />
                    {s.name}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Extra activities */}
      {extraIds.map(id => {
        const a = ACTS[id];
        if (!a) return null;
        const c = actColor(ACTS, subjects, id);
        return (
          <button
            key={id}
            className="chip"
            type="button"
            aria-pressed={active === id}
            onClick={() => { if (!locked) handleSelect(id); }}
          >
            <span className="key" style={{ background: c }} />
            {a.label}
          </button>
        );
      })}

      {/* Borrar */}
      <button
        className="chip"
        type="button"
        aria-pressed={active === null}
        onClick={() => { setActive(null); setPaletteMode(null); }}
      >
        <span className="key" style={{ background: 'transparent', border: '1px solid var(--rule)' }} />
        Borrar
      </button>

      {/* Lock toggle */}
      <div className="tools">
        <label className="toggle-wrap">
          <input
            type="checkbox"
            checked={locked}
            onChange={e => {
              setLocked(e.target.checked);
              if (e.target.checked) {
                setActive(null);
                setPaletteMode(null);
              }
            }}
          />
          <span className="toggle-track" />
          {locked ? 'Desbloquear' : 'Bloquear'}
        </label>
      </div>
    </div>
  );
}
