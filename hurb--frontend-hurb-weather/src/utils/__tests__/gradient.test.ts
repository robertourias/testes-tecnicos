import { getGradientTheme } from '../gradient';

describe('getGradientTheme', () => {
  it('retorna "neutral" quando temperatura é null', () => {
    expect(getGradientTheme(null)).toBe('neutral');
  });

  it('retorna "cold" para temperaturas abaixo de 15°C', () => {
    expect(getGradientTheme(14)).toBe('cold');
    expect(getGradientTheme(10)).toBe('cold');
    expect(getGradientTheme(0)).toBe('cold');
    expect(getGradientTheme(-5)).toBe('cold');
  });

  it('retorna "warm" para temperatura de 15°C (borda inferior)', () => {
    expect(getGradientTheme(15)).toBe('warm');
  });

  it('retorna "warm" para temperaturas entre 15°C e 35°C', () => {
    expect(getGradientTheme(20)).toBe('warm');
    expect(getGradientTheme(25)).toBe('warm');
    expect(getGradientTheme(30)).toBe('warm');
  });

  it('retorna "warm" para temperatura de 35°C (borda superior)', () => {
    expect(getGradientTheme(35)).toBe('warm');
  });

  it('retorna "hot" para temperaturas acima de 35°C', () => {
    expect(getGradientTheme(36)).toBe('hot');
    expect(getGradientTheme(40)).toBe('hot');
    expect(getGradientTheme(50)).toBe('hot');
  });
});
