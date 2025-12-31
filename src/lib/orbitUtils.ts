export function getOrbitPosition(
  index: number,
  total: number,
  radius: number
): [number, number, number] {
  const angle = (index / total) * Math.PI * 2;

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  return [x, 0, z];
}
