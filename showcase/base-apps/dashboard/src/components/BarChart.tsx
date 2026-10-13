import type { MonthlyValue } from '../data/metrics';

interface BarChartProps {
  title: string;
  data: MonthlyValue[];
}

const WIDTH = 600;
const HEIGHT = 240;
const PADDING_TOP = 24;
const PADDING_BOTTOM = 28;
const PADDING_X = 16;

export default function BarChart({ title, data }: BarChartProps) {
  const max = Math.max(...data.map((point) => point.value), 1);
  const plotHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const slot = (WIDTH - PADDING_X * 2) / data.length;
  const barWidth = slot * 0.6;
  const summary = data.map((point) => `${point.month}: ${point.value}`).join(', ');

  return (
    <figure className="chart" data-testid="bar-chart">
      <figcaption className="chart-title">{title}</figcaption>
      <svg
        className="chart-svg"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`${title}. ${summary}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <line
          className="chart-axis"
          x1={PADDING_X}
          x2={WIDTH - PADDING_X}
          y1={HEIGHT - PADDING_BOTTOM}
          y2={HEIGHT - PADDING_BOTTOM}
        />
        {data.map((point, index) => {
          const barHeight = (point.value / max) * plotHeight;
          const x = PADDING_X + index * slot + (slot - barWidth) / 2;
          const y = HEIGHT - PADDING_BOTTOM - barHeight;
          return (
            <g key={point.month} data-testid="chart-bar">
              <rect className="chart-bar" x={x} y={y} width={barWidth} height={barHeight} />
              <text className="chart-value" x={x + barWidth / 2} y={y - 6} textAnchor="middle">
                {point.value}
              </text>
              <text className="chart-label" x={x + barWidth / 2} y={HEIGHT - 8} textAnchor="middle">
                {point.month}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
