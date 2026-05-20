import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WeatherCard } from './WeatherCard';
import type { WeatherDay } from '@/types/weather';

// Usar formato com horário para evitar parse UTC que causa offset de timezone
const today = new Date();
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 12:00:00`;

const mockDay: WeatherDay = {
  date: todayStr,
  temp: 28,
  feelsLike: 30,
  description: 'poucas nuvens',
  icon: '02d',
};

describe('WeatherCard', () => {
  it('exibe temperatura em Celsius', () => {
    render(<WeatherCard day={mockDay} unit="C" onUnitToggle={jest.fn()} />);
    expect(screen.getByRole('button', { name: /28°C/i })).toBeInTheDocument();
  });

  it('exibe temperatura em Fahrenheit', () => {
    render(<WeatherCard day={mockDay} unit="F" onUnitToggle={jest.fn()} />);
    expect(screen.getByRole('button', { name: /82°F/i })).toBeInTheDocument();
  });

  it('chama onUnitToggle ao clicar na temperatura', async () => {
    const onUnitToggle = jest.fn();
    render(<WeatherCard day={mockDay} unit="C" onUnitToggle={onUnitToggle} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onUnitToggle).toHaveBeenCalledTimes(1);
  });

  it('aplica classe "today" quando isToday=true', () => {
    const { container } = render(
      <WeatherCard day={mockDay} unit="C" onUnitToggle={jest.fn()} isToday />
    );
    expect(container.querySelector('.today')).toBeInTheDocument();
  });

  it('não aplica classe "today" quando isToday=false', () => {
    const { container } = render(
      <WeatherCard day={mockDay} unit="C" onUnitToggle={jest.fn()} isToday={false} />
    );
    expect(container.querySelector('.today')).not.toBeInTheDocument();
  });

  it('exibe descrição do clima', () => {
    render(<WeatherCard day={mockDay} unit="C" onUnitToggle={jest.fn()} />);
    expect(screen.getByText('poucas nuvens')).toBeInTheDocument();
  });

  it('exibe ícone com alt igual à descrição', () => {
    render(<WeatherCard day={mockDay} unit="C" onUnitToggle={jest.fn()} />);
    expect(screen.getByAltText('poucas nuvens')).toBeInTheDocument();
  });

  it('exibe label "Hoje" para data atual', () => {
    render(<WeatherCard day={mockDay} unit="C" onUnitToggle={jest.fn()} />);
    expect(screen.getByText('Hoje')).toBeInTheDocument();
  });
});
