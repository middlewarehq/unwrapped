export function randInt(num1: number, num2: number = 0): number {
  if (num1 > num2) {
    const temp = num1;
    num1 = num2;
    num2 = temp;
  }

  return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
}
