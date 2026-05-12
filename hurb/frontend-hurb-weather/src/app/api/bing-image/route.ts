import { NextResponse } from 'next/server';

const BING_URL = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR';

export async function GET(): Promise<NextResponse> {
  const response = await fetch(BING_URL, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: `Falha ao buscar imagem do Bing (HTTP ${response.status})` },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
