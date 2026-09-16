import { meta } from '../data/utils';

export default function Meter({ subjects, grid, ACTS }) {
  const tally = {};
  subjects.forEach(s => (tally[s.id] = { S: 0, A: 0 }));

  for (const k in grid) {
    const a = ACTS[grid[k]];
    if (a && a.subject && tally[a.subject]) {
      tally[a.subject][a.kind]++;
    }
  }

  let req = 0;
  let got = 0;
  subjects.forEach(s => {
    req += meta(s);
    got += tally[s.id].S + tally[s.id].A;
  });

  const scale = Math.max(req, got) * 1.08 || 1;
  const segs = subjects.map(s => ({
    h: tally[s.id].S + tally[s.id].A,
    c: s.color
  }));

  const markPct = req > 0 ? Math.min(95, Math.max(5, req / scale * 100)) : 0;
  const d = got - req;

  const note = d >= 0
    ? `Vas ${d.toFixed(0)} h por encima del mínimo. Ese margen es el que dedicas a nivelar temas que traes flojos; cuando los cierres, podrás recuperarlo como descanso.`
    : `Te faltan ${(-d).toFixed(0)} h por ubicar en la semana para cumplir con los créditos inscritos.`;

  return (
    <div className="meter">
      <div className="meter-top">
        <div className="meter-title">Horas de actividad académica programadas</div>
        <div className="meter-num">
          <b>{got}</b> h de <span>{req.toFixed(0)}</span> h exigidas ·{' '}
          <span>{req > 0 ? Math.round(got / req * 100) : 0}</span>%
        </div>
      </div>
      <div className="track">
        <div
          className="fill"
          style={{ width: (got / scale * 100) + '%' }}
        >
          {segs.map((s, i) => (
            <div
              key={i}
              className="seg"
              style={{ width: (s.h / got * 100 || 0) + '%', background: s.c }}
            />
          ))}
        </div>
        {req > 0 && (
          <div className="mark" style={{ left: markPct + '%' }}>
            <span>mínimo exigido</span>
          </div>
        )}
      </div>
      <div className="meter-note">{note}</div>
    </div>
  );
}
