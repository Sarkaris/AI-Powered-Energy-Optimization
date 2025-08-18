import React, { useMemo } from 'react';
import { EnergyData } from '../types';

interface ChartProps {
  data: EnergyData[];
  type: 'line' | 'bar';
  metric: 'consumption' | 'cost' | 'co2Emissions';
  title: string;
  color?: string;
  height?: number;
}

export const Chart: React.FC<ChartProps> = ({
  data,
  type,
  metric,
  title,
  color = '#10b981',
  height = 200
}) => {
  const chartData = useMemo(() => {
    const values = data.map(d => d[metric]);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue;
    
    return values.map((value, index) => ({
      x: (index / (values.length - 1)) * 100,
      y: range > 0 ? ((value - minValue) / range) * 100 : 50,
      value,
      time: new Date(data[index].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
  }, [data, metric]);

  const pathData = useMemo(() => {
    if (type !== 'line') return '';
    
    return chartData.reduce((path, point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${path} ${command} ${point.x} ${100 - point.y}`;
    }, '');
  }, [chartData, type]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      
      <div className="relative" style={{ height }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0"
        >
          {type === 'line' ? (
            <>
              {/* Grid lines */}
              {[20, 40, 60, 80].map(y => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="0.1"
                  className="text-gray-200 dark:text-gray-700"
                />
              ))}
              
              {/* Area fill */}
              <path
                d={`${pathData} L 100 100 L 0 100 Z`}
                fill={color}
                fillOpacity="0.1"
              />
              
              {/* Line */}
              <path
                d={pathData}
                stroke={color}
                strokeWidth="0.5"
                fill="none"
                className="drop-shadow-sm"
              />
              
              {/* Data points */}
              {chartData.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={100 - point.y}
                  r="0.8"
                  fill={color}
                  className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <title>{`${point.time}: ${point.value.toFixed(2)}`}</title>
                </circle>
              ))}
            </>
          ) : (
            // Bar chart
            chartData.map((point, index) => (
              <rect
                key={index}
                x={point.x - 1}
                y={100 - point.y}
                width="2"
                height={point.y}
                fill={color}
                className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity"
              >
                <title>{`${point.time}: ${point.value.toFixed(2)}`}</title>
              </rect>
            ))
          )}
        </svg>
        
        {/* Hover overlay for interactivity */}
        <div className="absolute inset-0 grid grid-cols-6 gap-1">
          {chartData.slice(0, 6).map((point, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              title={`${point.time}: ${point.value.toFixed(2)}`}
            >
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                            bg-gray-900 dark:bg-gray-700 text-white text-xs rounded px-2 py-1
                            opacity-0 group-hover:opacity-100 transition-opacity mb-2 whitespace-nowrap">
                {point.time}: {point.value.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Time labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
        <span>{chartData[0]?.time}</span>
        <span>{chartData[Math.floor(chartData.length / 2)]?.time}</span>
        <span>{chartData[chartData.length - 1]?.time}</span>
      </div>
    </div>
  );
};