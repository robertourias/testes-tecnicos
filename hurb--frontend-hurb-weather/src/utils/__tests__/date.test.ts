import { formatWeatherDate } from '../date';

describe('formatWeatherDate', () => {
  // Mock da data atual para testes consistentes
  const mockToday = new Date('2026-05-12T12:00:00');

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockToday);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('retorna "Hoje" para data atual', () => {
    const today = new Date('2026-05-12T08:00:00').toISOString();
    expect(formatWeatherDate(today)).toBe('Hoje');
  });

  it('retorna "Hoje" para data atual em horário diferente', () => {
    const today = new Date('2026-05-12T18:00:00').toISOString();
    expect(formatWeatherDate(today)).toBe('Hoje');
  });

  it('retorna "Amanhã" para próximo dia', () => {
    const tomorrow = new Date('2026-05-13T08:00:00').toISOString();
    expect(formatWeatherDate(tomorrow)).toBe('Amanhã');
  });

  it('retorna "Amanhã" para próximo dia em horário diferente', () => {
    const tomorrow = new Date('2026-05-13T18:00:00').toISOString();
    expect(formatWeatherDate(tomorrow)).toBe('Amanhã');
  });

  it('retorna "Depois de amanhã" para dia seguinte', () => {
    const dayAfterTomorrow = new Date('2026-05-14T08:00:00').toISOString();
    expect(formatWeatherDate(dayAfterTomorrow)).toBe('Depois de amanhã');
  });

  it('retorna "Depois de amanhã" para dia seguinte em horário diferente', () => {
    const dayAfterTomorrow = new Date('2026-05-14T18:00:00').toISOString();
    expect(formatWeatherDate(dayAfterTomorrow)).toBe('Depois de amanhã');
  });

  it('retorna data formatada para dias além de "Depois de amanhã"', () => {
    const futureDate = new Date('2026-05-15T12:00:00').toISOString();
    const formatted = formatWeatherDate(futureDate);
    // Espera formato como "sexta-feira, 15 de mai."
    expect(formatted).toContain('15');
  });

  it('trata corretamente strings de data ISO', () => {
    const isoString = '2026-05-12T12:00:00.000Z';
    expect(formatWeatherDate(isoString)).toBe('Hoje');
  });

  it('trata corretamente timestamps', () => {
    const timestamp = new Date('2026-05-13T12:00:00').toISOString();
    expect(formatWeatherDate(timestamp)).toBe('Amanhã');
  });
});
