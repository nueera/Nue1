export function calcGross(basic: number, hra: number, da: number, specialAllowance: number): number {
  return basic + hra + da + specialAllowance;
}

export function calcPF(basic: number, pfRate: number = 0.12): number {
  return basic * pfRate;
}

export function calcESI(gross: number, esiRate: number = 0.0075): number {
  return gross * esiRate;
}

export function calcTax(gross: number): number {
  // Simplified tax calculation - placeholder
  if (gross <= 250000) return 0;
  if (gross <= 500000) return (gross - 250000) * 0.05;
  if (gross <= 1000000) return 12500 + (gross - 500000) * 0.2;
  return 112500 + (gross - 1000000) * 0.3;
}

export function calcNet(gross: number, deductions: number): number {
  return gross - deductions;
}

export function fmtCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
