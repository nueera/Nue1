/**
 * Calculate EMI (Equated Monthly Installment) using the standard formula:
 * EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
 * where P = principal, r = monthly interest rate, n = number of months
 */
export function calcEMI(principal: number, annualRate: number, tenureMonths: number): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  if (annualRate === 0) return principal / tenureMonths;

  const monthlyRate = annualRate / 12 / 100;
  const compoundFactor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = principal * monthlyRate * compoundFactor / (compoundFactor - 1);

  return Math.round(emi * 100) / 100;
}

/**
 * Calculate total interest payable over the loan tenure.
 */
export function calcInterest(principal: number, annualRate: number, tenureMonths: number): number {
  const emi = calcEMI(principal, annualRate, tenureMonths);
  const totalPayment = emi * tenureMonths;
  return Math.round((totalPayment - principal) * 100) / 100;
}

/**
 * Calculate the outstanding balance after a given number of paid installments.
 */
export function calcOutstandingBalance(
  principal: number,
  annualRate: number,
  tenureMonths: number,
  paidInstallments: number,
): number {
  if (paidInstallments >= tenureMonths) return 0;
  if (paidInstallments <= 0) return principal;

  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    const perMonth = principal / tenureMonths;
    return Math.round((principal - perMonth * paidInstallments) * 100) / 100;
  }

  const emi = calcEMI(principal, annualRate, tenureMonths);
  const compoundFactor = Math.pow(1 + monthlyRate, paidInstallments);
  const balance = principal * compoundFactor - emi * (compoundFactor - 1) / monthlyRate;

  return Math.max(0, Math.round(balance * 100) / 100);
}

/**
 * Generate a repayment schedule for the entire loan tenure.
 */
export function generateRepaymentSchedule(
  principal: number,
  annualRate: number,
  tenureMonths: number,
  startDate: string,
): Array<{
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
  date: string;
}> {
  const emi = calcEMI(principal, annualRate, tenureMonths);
  const monthlyRate = annualRate / 12 / 100;
  const schedule: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
    date: string;
  }> = [];

  let balance = principal;

  for (let i = 1; i <= tenureMonths; i++) {
    const interestPart = Math.round(balance * monthlyRate * 100) / 100;
    const principalPart = Math.round((emi - interestPart) * 100) / 100;
    balance = Math.max(0, Math.round((balance - principalPart) * 100) / 100);

    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);

    schedule.push({
      month: i,
      emi,
      principal: principalPart,
      interest: interestPart,
      balance,
      date: date.toISOString().split('T')[0],
    });
  }

  return schedule;
}
