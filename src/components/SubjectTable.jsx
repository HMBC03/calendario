import { meta, asyncHours } from '../data/utils';

export default function SubjectTable({ subjects, setSubjects, grid }) {
  function updateCredits(id, value) {
    setSubjects(prev => prev.map(s => {
      if (s.id !== id) return s;
      const newCreds = Math.max(0, parseInt(value) || 0);
      const newSync = s.syncHours > meta({ ...s, credits: newCreds })
        ? Math.floor(meta({ ...s, credits: newCreds }))
        : s.syncHours;
      return { ...s, credits: newCreds, syncHours: newSync };
    }));
  }

  function updateSync(id, value) {
    setSubjects(prev => prev.map(s => {
      if (s.id !== id) return s;
      const max = meta(s);
      return { ...s, syncHours: Math.max(0, Math.min(max, parseFloat(value) || 0)) };
    }));
  }

  function updateName(id, value) {
    setSubjects(prev => prev.map(s =>
      s.id === id ? { ...s, name: value } : s
    ));
  }

  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  const totalReq = subjects.reduce((sum, s) => sum + meta(s), 0);
  const totalSync = subjects.reduce((sum, s) => sum + (s.syncHours || 0), 0);
  const totalAsync = subjects.reduce((sum, s) => sum + asyncHours(s), 0);

  return (
    <section>
      <h2>Desglose por asignatura</h2>
      <p className="sectnote">
        Ingresa las horas sincrónicas de clase por materia. Las horas asincrónicas
        se calculan automáticamente (total exigido − sincrónicas).
      </p>
      <div className="tablecard" style={{ maxHeight: 420, overflowY: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Asignatura</th>
              <th className="num">Créditos</th>
              <th className="num">Total exigido<br />por semana</th>
              <th className="num">Horas<br />sincrónicas</th>
              <th className="num">Horas<br />asincrónicas</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map(s => {
              const m = meta(s);
              const sync = s.syncHours || 0;
              const asyncH = asyncHours(s);
              const pct = m > 0 ? Math.min(100, (sync + asyncH) / m * 100) : 0;
              const diff = (sync + asyncH) - m;

              return (
                <tr key={s.id}>
                  <td>
                    <span className="swatch" style={{ background: s.color }} />
                    <input
                      className="subjname"
                      value={s.name}
                      onChange={e => updateName(s.id, e.target.value)}
                      aria-label="Nombre de la asignatura"
                    />
                  </td>
                  <td className="num">
                    <input
                      className="credin"
                      type="number"
                      min="0"
                      step="1"
                      value={s.credits}
                      onChange={e => updateCredits(s.id, e.target.value)}
                      aria-label="Créditos"
                    />
                  </td>
                  <td className="num">{m.toFixed(0)} h</td>
                  <td className="num">
                    <input
                      className="syncin"
                      type="number"
                      min="0"
                      max={m}
                      step="0.5"
                      value={sync}
                      onChange={e => updateSync(s.id, e.target.value)}
                      aria-label="Horas sincrónicas"
                    /> h
                  </td>
                  <td className="num">
                    {asyncH.toFixed(1)} h
                    <div className="minibar">
                      <i style={{ width: pct + '%', background: s.color }} />
                    </div>
                    <span className={`delta ${diff >= 0 ? 'over' : ''}`}>
                      {diff >= 0 ? '+' + diff.toFixed(0) + ' h sobre la meta' : (-diff).toFixed(0) + ' h por asignar'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td className="num">{totalCredits}</td>
              <td className="num">{totalReq.toFixed(0)} h</td>
              <td className="num">{totalSync} h</td>
              <td className="num">{totalAsync.toFixed(1)} h</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
