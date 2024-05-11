export function getShortAmount(amount: number): string {
  if (amount < 1000) {
    return String(amount)
  } else if (amount >= 1000 && amount < 1000000) {
    return String((amount / 1000).toFixed(1)) + 'k'
  } else if (amount >= 1000000) {
    return String((amount / 1000000).toFixed(1)) + 'm'
  } else {
    return '-'
  }
}
