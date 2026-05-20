import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationInput } from './LocationInput';

describe('LocationInput', () => {
  it('renderiza com o valor inicial', () => {
    render(<LocationInput value="Rio de Janeiro" onSearch={jest.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('Rio de Janeiro');
  });

  it('chama onSearch ao pressionar Enter', async () => {
    const onSearch = jest.fn();
    render(<LocationInput value="" onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'São Paulo');
    await userEvent.keyboard('{Enter}');

    expect(onSearch).toHaveBeenCalledWith('São Paulo');
  });

  it('chama onSearch ao perder foco com valor diferente', async () => {
    const onSearch = jest.fn();
    render(<LocationInput value="Rio de Janeiro" onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'Curitiba');
    await userEvent.tab();

    expect(onSearch).toHaveBeenCalledWith('Curitiba');
  });

  it('não chama onSearch ao perder foco com o mesmo valor', async () => {
    const onSearch = jest.fn();
    render(<LocationInput value="Rio de Janeiro" onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    await userEvent.click(input);
    await userEvent.tab();

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('exibe mensagem de erro', () => {
    render(
      <LocationInput value="" onSearch={jest.fn()} error="Localidade não encontrada" />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Localidade não encontrada');
  });

  it('exibe spinner quando isLoading=true', () => {
    render(<LocationInput value="" onSearch={jest.fn()} isLoading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('desabilita o input quando isLoading=true', () => {
    render(<LocationInput value="" onSearch={jest.fn()} isLoading />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('não exibe spinner quando isLoading=false', () => {
    render(<LocationInput value="" onSearch={jest.fn()} isLoading={false} />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
