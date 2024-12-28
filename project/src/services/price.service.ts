import { PriceData } from '../types';
import { handleApiError } from '../utils/error';
import { CryptoSymbol } from '../types/crypto';
import { TimeFrame } from '../types/chart';
import api from './api';

const timeFrameToInterval = (timeFrame: TimeFrame) => {
  switch (timeFrame) {
    case '24H':
      return { interval: '1h', limit: 24 };
    case '7D':
      return { interval: '4h', limit: 42 };
    case '1M':
      return { interval: '1d', limit: 30 };
    case '1Y':
      return { interval: '1w', limit: 52 };
    default:
      return { interval: '1h', limit: 24 };
  }
};

export const getPriceData = async (symbol: CryptoSymbol = 'WLDUSDT'): Promise<PriceData> => {
  try {
    const response = await api.get('/ticker/price', {
      params: { symbol },
    });
    
    if (!response.data || !response.data.price) {
      throw new Error('Invalid price data received');
    }

    return {
      price: response.data.price,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    throw handleApiError(error);
  }
};

export const getHistoricalData = async (
  symbol: CryptoSymbol = 'WLDUSDT',
  timeFrame: TimeFrame = '24H'
) => {
  try {
    const { interval, limit } = timeFrameToInterval(timeFrame);
    const response = await api.get('/klines', {
      params: {
        symbol,
        interval,
        limit,
      },
    });

    if (!Array.isArray(response.data)) {
      throw new Error('Invalid historical data received');
    }
    
    return response.data.map((kline: any[]) => ({
      time: formatTimeByTimeFrame(new Date(kline[0]), timeFrame),
      price: parseFloat(kline[4]), // Using closing price
    }));
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error);
    throw handleApiError(error);
  }
};

const formatTimeByTimeFrame = (date: Date, timeFrame: TimeFrame): string => {
  switch (timeFrame) {
    case '24H':
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    case '7D':
      return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    case '1M':
    case '1Y':
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    default:
      return date.toLocaleString();
  }
};

// Get current prices for multiple symbols
export const getMultiplePrices = async (symbols: CryptoSymbol[]): Promise<Record<CryptoSymbol, number>> => {
  try {
    const response = await api.get('/ticker/price', {
      params: {
        symbols: JSON.stringify(symbols)
      }
    });

    if (!Array.isArray(response.data)) {
      throw new Error('Invalid price data received');
    }

    return response.data.reduce((acc: Record<CryptoSymbol, number>, curr: any) => {
      acc[curr.symbol as CryptoSymbol] = parseFloat(curr.price);
      return acc;
    }, {} as Record<CryptoSymbol, number>);
  } catch (error) {
    console.error('Error fetching multiple prices:', error);
    throw handleApiError(error);
  }
};