import { binanceClient } from '../api/binance-client';
import { CryptoInfo, CryptoListResponse } from './types';

const CACHE_DURATION = 60000; // 1 minuto
let cachedData: CryptoListResponse | null = null;

export const getCryptoList = async (): Promise<CryptoInfo[]> => {
  try {
    // Verificar caché
    if (
      cachedData &&
      Date.now() - cachedData.lastUpdate < CACHE_DURATION
    ) {
      return cachedData.symbols;
    }

    // Obtener datos de la API
    const [ticker24h, exchangeInfo] = await Promise.all([
      binanceClient.get('/api/v3/ticker/24hr'),
      binanceClient.get('/api/v3/exchangeInfo')
    ]);

    // Filtrar solo pares USDT
    const usdtPairs = exchangeInfo.symbols.filter(
      (symbol: any) => symbol.quoteAsset === 'USDT'
    );

    // Mapear datos
    const cryptoList = usdtPairs.map((pair: any) => {
      const ticker = ticker24h.find(
        (t: any) => t.symbol === pair.symbol
      );

      return {
        symbol: pair.symbol,
        name: pair.baseAsset,
        price: ticker?.lastPrice || '0',
        priceChangePercent: ticker?.priceChangePercent || '0',
        volume: ticker?.volume || '0',
        marketCap: ticker?.quoteVolume || '0',
        circulatingSupply: '0' // Binance no proporciona este dato
      };
    });

    // Actualizar caché
    cachedData = {
      symbols: cryptoList,
      lastUpdate: Date.now()
    };

    return cryptoList;
  } catch (error) {
    console.error('Error fetching crypto list:', error);
    throw error;
  }
};