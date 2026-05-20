import { celsiusToFahrenheit, fahrenheitToCelsius, formatTemperature } from '../temperature';

describe('celsiusToFahrenheit', () => {
  it('converte 0°C para 32°F', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });

  it('converte 100°C para 212°F', () => {
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  it('converte -40°C para -40°F', () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });

  it('converte 25°C para 77°F', () => {
    expect(celsiusToFahrenheit(25)).toBe(77);
  });

  it('converte temperaturas negativas corretamente', () => {
    expect(celsiusToFahrenheit(-10)).toBe(14);
  });
});

describe('fahrenheitToCelsius', () => {
  it('converte 32°F para 0°C', () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
  });

  it('converte 212°F para 100°C', () => {
    expect(fahrenheitToCelsius(212)).toBe(100);
  });

  it('converte -40°F para -40°C', () => {
    expect(fahrenheitToCelsius(-40)).toBe(-40);
  });

  it('converte 77°F para 25°C', () => {
    expect(fahrenheitToCelsius(77)).toBe(25);
  });
});

describe('formatTemperature', () => {
  it('formata temperatura em Celsius', () => {
    expect(formatTemperature(25, 'C')).toBe('25°C');
  });

  it('formata temperatura em Fahrenheit', () => {
    expect(formatTemperature(25, 'F')).toBe('77°F');
  });

  it('arredonda valores decimais', () => {
    expect(formatTemperature(25.6, 'C')).toBe('26°C');
    expect(formatTemperature(25.4, 'C')).toBe('25°C');
  });

  it('formata temperaturas negativas', () => {
    expect(formatTemperature(-10, 'C')).toBe('-10°C');
    expect(formatTemperature(-10, 'F')).toBe('14°F');
  });

  it('formata zero grau', () => {
    expect(formatTemperature(0, 'C')).toBe('0°C');
    expect(formatTemperature(0, 'F')).toBe('32°F');
  });
});
