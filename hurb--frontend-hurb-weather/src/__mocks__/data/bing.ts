/**
 * Mock de dados da API Bing Daily Image para testes
 * Simula resposta da imagem do dia do Bing
 */

export interface BingImageResponse {
  images: Array<{
    startdate: string;
    fullstartdate: string;
    enddate: string;
    url: string;
    urlbase: string;
    copyright: string;
    copyrightlink: string;
    title: string;
    quiz: string;
    wp: boolean;
    hsh: string;
    drk: number;
    top: number;
    bot: number;
    hs: Array<unknown>;
  }>;
  tooltips: {
    loading: string;
    previous: string;
    next: string;
    walle: string;
    walls: string;
  };
}

export const mockBingResponse: BingImageResponse = {
  images: [
    {
      startdate: '20220514',
      fullstartdate: '202205140700',
      enddate: '20220515',
      url: '/th?id=OHR.CatedralMexico_PT-BR7604191219_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
      urlbase: '/th?id=OHR.CatedralMexico_PT-BR7604191219',
      copyright: 'Catedral Metropolitana da Cidade do México, México (© Lunamarina/Getty Images)',
      copyrightlink: 'https://www.bing.com/search?q=catedral+metropolitana+cidade+do+mexico',
      title: 'Uma joia colonial na Cidade do México',
      quiz: '/search?q=Bing+homepage+quiz&filters=WQOskey:%22HPQuiz_20220514_CatedralMexico%22&FORM=HPQUIZ',
      wp: true,
      hsh: 'c5e8f5c3f8e6a5b8f8e6a5b8f8e6a5b8',
      drk: 1,
      top: 1,
      bot: 1,
      hs: [],
    },
  ],
  tooltips: {
    loading: 'Carregando...',
    previous: 'Anterior',
    next: 'Próxima',
    walle: 'Esta imagem não está disponível para download como papel de parede.',
    walls: 'Baixar esta imagem. Usar esta imagem apenas como papel de parede.',
  },
};
