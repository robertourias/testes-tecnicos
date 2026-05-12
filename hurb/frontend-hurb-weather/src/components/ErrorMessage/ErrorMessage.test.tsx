import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('exibe a mensagem de erro correta', () => {
    render(<ErrorMessage message="Localidade não encontrada" onRetry={jest.fn()} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Localidade não encontrada');
  });

  it('chama onRetry ao clicar no botão', async () => {
    const onRetry = jest.fn();
    render(<ErrorMessage message="Erro" onRetry={onRetry} />);

    await userEvent.click(screen.getByRole('button', { name: /tentar novamente/i }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('exibe botão "Tentar novamente"', () => {
    render(<ErrorMessage message="Erro" onRetry={jest.fn()} />);
    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument();
  });
});
