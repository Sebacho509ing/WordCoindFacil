import { ChartData } from '../types/chart';

export const calculatePriceChange = (data: ChartData[]): {
  isPositive: boolean;
  percentageChange: number;
} => {
  if (data.length < 2) {
    return { isPositive: true, percentageChange: 0 };
  }

  const firstPrice = data[0].price;
  const lastPrice = data[data.length - 1].price;
  const change = lastPrice - firstPrice;
  const percentageChange = (change / firstPrice) * 100;

  return {
    isPositive: change >= 0,
    percentageChange: Math.abs(percentageChange),
  };
};

export const getPriceColor = (currentPrice: number, previousPrice: number): string => {
  if (currentPrice > previousPrice) return '#008F39'; // Verde para subida
  if (currentPrice < previousPrice) return '#DC2626'; // Rojo para bajada
  return '#008F39'; // Verde por defecto
};