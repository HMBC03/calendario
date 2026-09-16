export const COLORS = [
  '#1D5E4F','#2A4C8A','#A8541F','#6B4A8F','#0F7B8A',
  '#8E2F45','#C44D56','#4A9E8E','#D4883E','#6B73C4',
  '#2E7D6F','#8B5E3C','#5B6AAF','#3A7D7E','#9E4466'
];

export function shuffleColors() {
  const pool = [...COLORS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}
