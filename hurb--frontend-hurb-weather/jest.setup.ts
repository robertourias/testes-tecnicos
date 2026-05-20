import '@testing-library/jest-dom';

// Polyfill para fetch API (necessário para Jest)
import 'whatwg-fetch';

// Polyfill para TextEncoder/TextDecoder (necessário para MSW em Node)
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// Mock de variáveis de ambiente para testes
process.env.NEXT_PUBLIC_OPENWEATHER_APPID = 'test_openweather_key';
process.env.NEXT_PUBLIC_OPENCAGE_API_KEY = 'test_opencage_key';
