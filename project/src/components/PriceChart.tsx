import React, { memo, useMemo } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { calculatePriceChange, getPriceColor } from '../utils/chart';

interface PriceChartProps {
  data: Array<{ time: string; price: number }>;
}

export const PriceChart: React.FC<PriceChartProps> = memo(({ data }) => {
  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));
  const padding = (maxPrice - minPrice) * 0.1;

  const { isPositive } = useMemo(() => calculatePriceChange(data), [data]);
  const chartColor = isPositive ? '#008F39' : '#DC2626';

  // Add previous price to each data point for color calculation
  const enhancedData = data.map((point, index) => ({
    ...point,
    previousPrice: index > 0 ? data[index - 1].price : point.price,
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={enhancedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop 
                offset="5%" 
                stopColor={chartColor}
                stopOpacity={0.8}
              />
              <stop 
                offset="95%" 
                stopColor={chartColor}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#374151"
          />
          <XAxis 
            dataKey="time" 
            stroke="#94A3B8"
            tickLine={false}
            tick={{ fill: '#94A3B8' }}
            dy={10}
          />
          <YAxis 
            stroke="#94A3B8"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
            domain={[minPrice - padding, maxPrice + padding]}
            tick={{ fill: '#94A3B8' }}
          />
          <Tooltip 
            contentStyle={{ 
              background: '#1E293B',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#F8FAFC',
              padding: '12px'
            }}
            itemStyle={{ color: '#F8FAFC' }}
            labelStyle={{ color: '#94A3B8' }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Precio']}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={chartColor}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
            dot={false}
            activeDot={{ 
              r: 6, 
              fill: chartColor, 
              stroke: '#fff' 
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center text-sm">
        <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {calculatePriceChange(data).percentageChange.toFixed(2)}%
        </span>
        <span className="text-gray-500 dark:text-gray-400 ml-2">
          en el período seleccionado
        </span>
      </div>
    </div>
  );
});

PriceChart.displayName = 'PriceChart';