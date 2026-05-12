import { render } from '@testing-library/react';
import { BackgroundImage } from './BackgroundImage';

describe('BackgroundImage', () => {
  it('renderiza imagem quando imageUrl é fornecida', () => {
    const { container } = render(
      <BackgroundImage imageUrl="https://www.bing.com/test.jpg" theme="neutral" />
    );
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'https://www.bing.com/test.jpg');
  });

  it('não renderiza imagem quando imageUrl é null', () => {
    const { container } = render(<BackgroundImage imageUrl={null} theme="neutral" />);
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('aplica classe CSS "cold" para tema cold', () => {
    const { container } = render(<BackgroundImage imageUrl={null} theme="cold" />);
    const overlay = container.querySelector('.cold');
    expect(overlay).toBeInTheDocument();
  });

  it('aplica classe CSS "warm" para tema warm', () => {
    const { container } = render(<BackgroundImage imageUrl={null} theme="warm" />);
    expect(container.querySelector('.warm')).toBeInTheDocument();
  });

  it('aplica classe CSS "hot" para tema hot', () => {
    const { container } = render(<BackgroundImage imageUrl={null} theme="hot" />);
    expect(container.querySelector('.hot')).toBeInTheDocument();
  });

  it('aplica classe CSS "neutral" para tema neutral', () => {
    const { container } = render(<BackgroundImage imageUrl={null} theme="neutral" />);
    expect(container.querySelector('.neutral')).toBeInTheDocument();
  });
});
