import { meta } from '../data/utils';

export default function Header({ subjects }) {
  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);

  return (
    <header>
      <div>
        <h1>Planificador de carga académica</h1>
        <p className="lede">
          Un crédito equivale a 48 horas de actividad académica por semestre.
          Repartidas en 16 semanas, cada crédito pide 3 horas a la semana entre
          clase y estudio autónomo.
        </p>
      </div>
      <div className="creditbox">
        <span className="n">{totalCredits}</span>
        <span className="t">créditos inscritos este semestre</span>
      </div>
    </header>
  );
}
