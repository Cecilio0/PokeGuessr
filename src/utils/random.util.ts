export function getRandomIntegerInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getNDistinctRandomNumbers(
  n: number,
  min: number,
  max: number
): number[] {
  const numbers = new Set<number>();
  while (numbers.size < n) {
    const randomNum = getRandomIntegerInRange(min, max);
    numbers.add(randomNum);
  }
  return Array.from(numbers);
}
