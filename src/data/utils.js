import { HORAS_CREDITO, SEMANAS } from './constants';

export function key(d, h) {
  return d + '_' + h;
}

export function meta(s) {
  return s.credits * HORAS_CREDITO / SEMANAS;
}

export function asyncHours(s) {
  return Math.max(0, meta(s) - (s.syncHours || 0));
}

export function actColor(ACTS, subjects, id) {
  const a = ACTS[id];
  if (!a) return '#9AA6AC';
  if (a.color) return a.color;
  return (subjects.find(s => s.id === a.subject) || {}).color || '#9AA6AC';
}
