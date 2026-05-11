export function formatCurrencyEUR(value?: number, options?: Intl.NumberFormatOptions): string {
    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        ...options,
    });
    if (value === null) {
        return formatter.format(0);
    }

    return formatter.format(value ?? 0);
}
