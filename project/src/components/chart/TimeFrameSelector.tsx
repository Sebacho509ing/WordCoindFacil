import React from 'react';
import { TimeFrame } from '../../types/chart';

interface TimeFrameSelectorProps {
  selectedTimeFrame: TimeFrame;
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
}

export const TimeFrameSelector: React.FC<TimeFrameSelectorProps> = ({
  selectedTimeFrame,
  onTimeFrameChange,
}) => {
  const timeFrames: { value: TimeFrame; label: string }[] = [
    { value: '24H', label: '24H' },
    { value: '7D', label: '7D' },
    { value: '1M', label: '1M' },
    { value: '1Y', label: '1Y' },
  ];

  return (
    <div className="flex gap-2">
      {timeFrames.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onTimeFrameChange(value)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            selectedTimeFrame === value
              ? 'bg-primary text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};