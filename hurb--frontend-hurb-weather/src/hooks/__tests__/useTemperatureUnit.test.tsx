import { renderHook, act } from '@testing-library/react';
import { useTemperatureUnit } from '../useTemperatureUnit';

describe('useTemperatureUnit', () => {
  it('retorna unidade inicial "C"', () => {
    const { result } = renderHook(() => useTemperatureUnit());

    expect(result.current.unit).toBe('C');
  });

  it('alterna de "C" para "F" ao chamar toggleUnit', () => {
    const { result } = renderHook(() => useTemperatureUnit());

    act(() => {
      result.current.toggleUnit();
    });

    expect(result.current.unit).toBe('F');
  });

  it('volta para "C" ao chamar toggleUnit novamente', () => {
    const { result } = renderHook(() => useTemperatureUnit());

    act(() => {
      result.current.toggleUnit();
    });
    act(() => {
      result.current.toggleUnit();
    });

    expect(result.current.unit).toBe('C');
  });

  it('expõe função toggleUnit estável entre re-renders', () => {
    const { result, rerender } = renderHook(() => useTemperatureUnit());

    const firstToggle = result.current.toggleUnit;
    rerender();

    expect(result.current.toggleUnit).toBe(firstToggle);
  });
});
