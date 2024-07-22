export function getRandColor(colors: string[]): string {
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
