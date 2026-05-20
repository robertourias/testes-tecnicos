import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WeatherGrid } from './WeatherGrid';
import type { WeatherDay } from '@/types/weather';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const dayAfter = new Date(today);
dayAfter.setDate(today.getDate() + 2);

const mockForecast: WeatherDay[] = [
  { date: today.toISOString().split('T')[0], temp: 28, feelsLike: 30, description: 'ensolarado', icon: '01d' },
  { date: tomorrow.toISOString().split('T')[0], temp: 22, feelsLike: 23, description: 'nublado', icon: '04d' },
  { date: dayAfter.toISOString().split('T')[0], temp: 18, feelsLike: 19, description: 'chuva', icon: '10d' },
];

describe('WeatherGrid', () => {
  it('renderiza exatamente 3 cards', () => {
    render(<WeatherGrid forecast={mockForecast} unit="C" onUnitToggle={jest.fn()} />);
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('marca o primeiro card como hoje', () => {
    const { container } = render(
      <WeatherGrid forecast={mockForecast} unit="C" onUnitToggle={jest.fn()} />
    );
    const todayCards = container.querySelectorAll('.today');
    expect(todayCards).toHaveLength(1);
  });

  it('passa a unidade correta para cada card', () => {
    render(<WeatherGrid forecast={mockForecast} unit="F" onUnitToggle={jest.fn()} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toHaveAccessibleName(/°F/);
    });
  });

  it('chama onUnitToggle ao clicar em qualquer temperatura', async () => {
    const onUnitToggle = jest.fn();
    render(<WeatherGrid forecast={mockForecast} unit="C" onUnitToggle={onUnitToggle} />);

    await userEvent.click(screen.getAllByRole('button')[0]);

    expect(onUnitToggle).toHaveBeenCalledTimes(1);
  });
});
