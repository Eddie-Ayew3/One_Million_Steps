import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface StepChartProps {
  campaignId: string;
  timeRange: 'day' | 'week' | 'month';
  steps: number;
  goal: number;
}

const StepChart: React.FC<StepChartProps> = ({ campaignId, timeRange, steps, goal }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const labels = timeRange === 'day'
      ? ['Morning', 'Afternoon', 'Evening']
      : timeRange === 'week'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

    const data = timeRange === 'day'
      ? [steps * 0.3, steps * 0.5, steps * 0.2]
      : timeRange === 'week'
      ? [steps * 0.15, steps * 0.2, steps * 0.25, steps * 0.1, steps * 0.2, steps * 0.05, steps * 0.05]
      : [steps * 0.25, steps * 0.3, steps * 0.3, steps * 0.15];

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Steps',
            data,
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
          },
          {
            label: 'Goal',
            data: Array(labels.length).fill(goal / labels.length),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Steps' } },
          x: { title: { display: true, text: timeRange.charAt(0).toUpperCase() + timeRange.slice(1) } },
        },
        plugins: {
          legend: { position: 'top' },
          tooltip: { mode: 'index', intersect: false },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [timeRange, steps, goal]);

  return (
    <div
      className="h-64"
      role="img"
      aria-label={`Step progress chart for campaign ${campaignId} over ${timeRange}`}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default StepChart;