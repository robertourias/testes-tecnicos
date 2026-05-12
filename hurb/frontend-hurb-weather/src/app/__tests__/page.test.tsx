import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';
import { useWeather } from '@/hooks/useWeather';
import { useTemperatureUnit } from '@/hooks/useTemperatureUnit';
import type { WeatherDay } from '@/types/weather';

jest.mock('@/hooks/useWeather');
jest.mock('@/hooks/useTemperatureUnit');

const mockUseWeather = useWeather as jest.MockedFunction<typeof useWeather>;
const mockUseTemperatureUnit = useTemperatureUnit as jest.MockedFunction<typeof useTemperatureUnit>;

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const dayAfter = new Date(today);
dayAfter.setDate(today.getDate() + 2);

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} 12:00:00`;
}

const mockForecast: WeatherDay[] = [
  { date: toDateStr(today), temp: 28, feelsLike: 30, description: 'ensolarado', icon: '01d' },
  { date: toDateStr(tomorrow), temp: 22, feelsLike: 23, description: 'nublado', icon: '04d' },
  { date: toDateStr(dayAfter), temp: 18, feelsLike: 19, description: 'chuva', icon: '10d' },
];

const defaultWeatherState = {
  location: 'Rio de Janeiro',
  forecast: mockForecast,
  backgroundImage: 'https://www.bing.com/test.jpg',
  loading: false,
  error: null,
  setLocation: jest.fn(),
};

const defaultUnitState = {
  unit: 'C' as const,
  toggleUnit: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  mockUseWeather.mockReturnValue(defaultWeatherState);
  mockUseTemperatureUnit.mockReturnValue(defaultUnitState);
});

describe('Home (página principal)', () => {
  it('exibe os 3 cards de previsão no happy path', () => {
    render(<Home />);
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('exibe o nome da localidade no header', () => {
    render(<Home />);
    expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
  });

  it('exibe o input de localidade com o valor atual', () => {
    render(<Home />);
    expect(screen.getByRole('textbox')).toHaveValue('Rio de Janeiro');
  });

  it('exibe LoadingState enquanto loading=true', () => {
    mockUseWeather.mockReturnValue({ ...defaultWeatherState, loading: true, forecast: [] });
    render(<Home />);
    expect(screen.getByRole('region', { name: /carregando/i })).toBeInTheDocument();
  });

  it('não exibe cards durante o loading', () => {
    mockUseWeather.mockReturnValue({ ...defaultWeatherState, loading: true, forecast: [] });
    render(<Home />);
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('exibe ErrorMessage quando há erro de geolocalização (sem localização)', () => {
    mockUseWeather.mockReturnValue({
      ...defaultWeatherState,
      location: null,
      loading: false,
      forecast: [],
      error: 'Permissão de localização negada',
    });
    render(<Home />);
    expect(screen.getByRole('alert')).toHaveTextContent('Permissão de localização negada');
  });

  it('não exibe cards quando há erro sem localização', () => {
    mockUseWeather.mockReturnValue({
      ...defaultWeatherState,
      location: null,
      loading: false,
      forecast: [],
      error: 'Erro',
    });
    render(<Home />);
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('chama setLocation ao buscar nova cidade no input', async () => {
    const setLocation = jest.fn();
    mockUseWeather.mockReturnValue({ ...defaultWeatherState, setLocation });
    render(<Home />);

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'São Paulo');
    await userEvent.keyboard('{Enter}');

    expect(setLocation).toHaveBeenCalledWith('São Paulo');
  });

  it('chama toggleUnit ao clicar em uma temperatura', async () => {
    const toggleUnit = jest.fn();
    mockUseTemperatureUnit.mockReturnValue({ unit: 'C', toggleUnit });
    render(<Home />);

    await userEvent.click(screen.getAllByRole('button')[0]);

    expect(toggleUnit).toHaveBeenCalledTimes(1);
  });

  it('exibe temperaturas em Fahrenheit quando unit="F"', () => {
    mockUseTemperatureUnit.mockReturnValue({ unit: 'F', toggleUnit: jest.fn() });
    render(<Home />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAccessibleName(/°F/);
  });

  it('aplica tema de gradiente "warm" para temperatura de 28°C', () => {
    render(<Home />);
    // BackgroundImage recebe theme="warm" (28°C está entre 15 e 35)
    // O container tem aria-hidden e não expõe role, mas o overlay tem a classe
    const { container } = render(<Home />);
    expect(container.querySelector('.warm')).toBeInTheDocument();
  });
});
