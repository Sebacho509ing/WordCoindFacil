export type TimeFrame = '24H' | '7D' | '1M' | '1Y';

export interface ChartData {
  time: string;
  price: number;
}

export interface ChartProps {
  data: ChartData[];
  title?: string;
}