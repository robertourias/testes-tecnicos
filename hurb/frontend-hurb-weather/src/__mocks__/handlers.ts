import { http } from 'msw';

export const handlers: Array<ReturnType<typeof http.get | typeof http.post>> = [];
