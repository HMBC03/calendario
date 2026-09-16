import { useState, useEffect } from 'react';
import { DEFAULT_SUBJECTS, DEFAULT_ACTS, SEED, CUSTOM_SEED } from './data/defaults';
import { HORAS } from './data/constants';
import { key } from './data/utils';
import { shuffleColors } from './data/colors';
import Header from './components/Header';
import Meter from './components/Meter';
import SubjectManager from './components/SubjectManager';
import SubjectTable from './components/SubjectTable';
import Palette from './components/Palette';
import Calendar from './components/Calendar';
import './App.css';

function loadInitial() {
  try {
    const raw = localStorage.getItem('planificador-unal-v2');
    if (raw) {
      const o = JSON.parse(raw);
      return {
        subjects: o.subjects || DEFAULT_SUBJECTS,
        grid: o.grid || {},
        custom: o.custom || {}
      };
    }
  } catch (e) {}
  const grid = {};
  for (let d = 0; d < 7; d++) {
    for (const h of HORAS) {
      if (SEED[d] && SEED[d][h]) grid[key(d, h)] = SEED[d][h];
    }
  }
  return {
    subjects: DEFAULT_SUBJECTS,
    grid,
    custom: { ...CUSTOM_SEED }
  };
}

export default function App() {
  const initial = loadInitial();
  const [subjects, setSubjects] = useState(initial.subjects);
  const [grid, setGrid] = useState(initial.grid);
  const [custom, setCustom] = useState(initial.custom);
  const [ACTS, setACTS] = useState(DEFAULT_ACTS);
  const [active, setActive] = useState(null);
  const [paletteMode, setPaletteMode] = useState(null);
  const [locked, setLocked] = useState(false);
  const [colorPool, setColorPool] = useState(shuffleColors());

  useEffect(() => {
    try {
      localStorage.setItem('planificador-unal-v2', JSON.stringify({ grid, custom, subjects }));
    } catch (e) {}
  }, [grid, custom, subjects]);

  useEffect(() => {
    function handleClick(e) {
      if (paletteMode && !e.target.closest('.palette-wrap')) {
        setPaletteMode(null);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [paletteMode]);

  return (
    <div className="wrap">
      <Header subjects={subjects} />
      <Meter subjects={subjects} grid={grid} ACTS={ACTS} />
      <SubjectManager
        subjects={subjects}
        setSubjects={setSubjects}
        ACTS={ACTS}
        setACTS={setACTS}
        grid={grid}
        setGrid={setGrid}
        custom={custom}
        setCustom={setCustom}
        colorPool={colorPool}
        setColorPool={setColorPool}
      />
      <SubjectTable
        subjects={subjects}
        setSubjects={setSubjects}
        grid={grid}
      />
      <section>
        <h2>Horario semanal</h2>
        <p className="sectnote">
          Selecciona Sincrónica o Asincrónica, elige la materia y arrastra sobre
          la grilla para pintarla.
        </p>
        <Palette
          subjects={subjects}
          ACTS={ACTS}
          paletteMode={paletteMode}
          setPaletteMode={setPaletteMode}
          active={active}
          setActive={setActive}
          locked={locked}
          setLocked={setLocked}
        />
        <Calendar
          subjects={subjects}
          ACTS={ACTS}
          grid={grid}
          setGrid={setGrid}
          custom={custom}
          setCustom={setCustom}
          locked={locked}
          active={active}
        />
        <div className="legend">
          <span><i style={{ background: 'var(--ink-3)' }} /> Bloque sólido: sincrónico (clase con el docente)</span>
          <span><i className="async" style={{ borderColor: 'var(--ink-3)' }} /> Bloque punteado: asincrónico (estudio autónomo)</span>
        </div>
        <p className="hint">
          Elige Sincrónica o Asincrónica, luego selecciona la materia. Arrastra
          sobre la grilla para pintar. Doble clic para escribir un rótulo propio.
          Se guarda en este navegador.
        </p>
      </section>
      <footer>
        Héctor Manuel Beltrán Cifuentes · Ciencias de la Computación · Facultad
        de Ciencias · Universidad Nacional de Colombia, Sede Bogotá
      </footer>
    </div>
  );
}
