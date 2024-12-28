import React, { useState } from 'react';
import { LineChart } from 'lucide-react';
import { PriceChart } from '../PriceChart';
import { TimeFrameSelector } from '../chart/TimeFrameSelector';
import { TimeFrame } from '../../types/chart';
import { usePriceData } from '../../hooks/usePriceData';
import { formatCryptoPrice } from '../../utils/number';

export const WLDPriceChart: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('24H');
  const { price, chartData, loading, error } = usePriceData('WLDUSDT', timeFrame);

  if (loading) {
    return (
      <div className="bg-white dark:bg-dark-light p-6 rounded-lg shadow-lg animate-pulse">
        <div className="h-[400px] bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-light p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LineChart className="text-primary w-6 h-6" />
          <div>
            <h2 className="text-xl font-bold">WLD/USDT</h2>
            <p className="text-gray-600 dark:text-gray-400">
              ${formatCryptoPrice(price, 'WLDUSDT')}
            </p>
          </div>
        </div>
        <TimeFrameSelector
          selectedTimeFrame={timeFrame}
          onTimeFrameChange={setTimeFrame}
        />
      </div>
      
      <PriceChart data={chartData} />
    </div>
  );
};