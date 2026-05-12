import { getMeteoconIcon } from '../icons';

describe('getMeteoconIcon', () => {
  describe('grupo 2xx - tempestade', () => {
    it('retorna "cloud-flash" para código 200 (tempestade leve)', () => {
      expect(getMeteoconIcon(200)).toBe('cloud-flash');
    });

    it('retorna "cloud-flash" para código 211 (tempestade)', () => {
      expect(getMeteoconIcon(211)).toBe('cloud-flash');
    });

    it('retorna "cloud-flash" para código 232 (tempestade forte)', () => {
      expect(getMeteoconIcon(232)).toBe('cloud-flash');
    });
  });

  describe('grupo 3xx - garoa', () => {
    it('retorna "cloud-drizzle" para código 300 (garoa leve)', () => {
      expect(getMeteoconIcon(300)).toBe('cloud-drizzle');
    });

    it('retorna "cloud-drizzle" para código 321 (garoa forte)', () => {
      expect(getMeteoconIcon(321)).toBe('cloud-drizzle');
    });
  });

  describe('grupo 5xx - chuva', () => {
    it('retorna "cloud-rain" para código 500 (chuva leve)', () => {
      expect(getMeteoconIcon(500)).toBe('cloud-rain');
    });

    it('retorna "cloud-hail" para código 511 (chuva congelante)', () => {
      expect(getMeteoconIcon(511)).toBe('cloud-hail');
    });

    it('retorna "cloud-rain" para código 521 (chuva forte)', () => {
      expect(getMeteoconIcon(521)).toBe('cloud-rain');
    });
  });

  describe('grupo 6xx - neve', () => {
    it('retorna "cloud-snow" para código 600 (neve leve)', () => {
      expect(getMeteoconIcon(600)).toBe('cloud-snow');
    });

    it('retorna "cloud-snow" para código 622 (neve forte)', () => {
      expect(getMeteoconIcon(622)).toBe('cloud-snow');
    });
  });

  describe('grupo 7xx - atmosfera', () => {
    it('retorna "cloud-fog" para código 701 (névoa)', () => {
      expect(getMeteoconIcon(701)).toBe('cloud-fog');
    });

    it('retorna "cloud-fog" para código 741 (neblina)', () => {
      expect(getMeteoconIcon(741)).toBe('cloud-fog');
    });
  });

  describe('grupo 800 - céu limpo', () => {
    it('retorna "sun" para código 800 (céu limpo)', () => {
      expect(getMeteoconIcon(800)).toBe('sun');
    });
  });

  describe('grupo 80x - nuvens', () => {
    it('retorna "cloud-sun" para código 801 (poucas nuvens)', () => {
      expect(getMeteoconIcon(801)).toBe('cloud-sun');
    });

    it('retorna "cloud" para código 802 (nuvens dispersas)', () => {
      expect(getMeteoconIcon(802)).toBe('cloud');
    });

    it('retorna "cloud" para código 803 (nuvens quebradas)', () => {
      expect(getMeteoconIcon(803)).toBe('cloud');
    });

    it('retorna "cloud" para código 804 (céu coberto)', () => {
      expect(getMeteoconIcon(804)).toBe('cloud');
    });
  });

  describe('fallback', () => {
    it('retorna "sun" para código desconhecido', () => {
      expect(getMeteoconIcon(999)).toBe('sun');
    });

    it('retorna "sun" para código 0', () => {
      expect(getMeteoconIcon(0)).toBe('sun');
    });
  });
});
