export interface LineSeries {
  name: string;
  /** CSS color, e.g. "var(--color-info)" */
  color: string;
  values: number[];
}

export interface LineChartProps {
  labels: string[];
  series: LineSeries[];
  /** Short description for screen readers; the data table carries the values. */
  caption: string;
  tickCount?: number;
}

function niceMax(value: number, tickCount: number) {
  if (value <= 0) return tickCount;
  const rawStep = value / tickCount;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const step = [1, 2, 5, 10].map((factor) => factor * magnitude).find((candidate) => candidate >= rawStep)!;
  return step * tickCount;
}

/**
 * Small multi-series line chart. Lines are an SVG stretched to the plot area;
 * axis labels and point markers are HTML so they keep their size on any width.
 */
export function LineChart({ labels, series, caption, tickCount = 3 }: LineChartProps) {
  const max = niceMax(Math.max(0, ...series.flatMap((line) => line.values)), tickCount);
  const ticks = Array.from({ length: tickCount + 1 }, (_, index) => (max / tickCount) * (tickCount - index));
  // Points sit in the middle of each label column.
  const xOf = (index: number) => ((index + 0.5) / labels.length) * 100;
  const yOf = (value: number) => 100 - (value / max) * 100;

  return (
    <figure className="flex flex-col gap-2">
      <div className="grid grid-cols-[auto_1fr] gap-x-2" aria-hidden="true">
        <div className="relative h-[120px] text-right text-xs leading-none">
          {/* Invisible copy of the widest label sets the column width. */}
          <span className="invisible">{ticks[0]}</span>
          {ticks.map((tick, index) => (
            <span key={tick} className="absolute right-0 -translate-y-1/2" style={{ top: `${(index / tickCount) * 100}%` }}>
              {tick}
            </span>
          ))}
        </div>
        <div className="relative h-[120px]">
          {ticks.map((tick, index) => (
            <span
              key={tick}
              className="absolute inset-x-0 border-t border-dashed border-border"
              style={{ top: `${(index / tickCount) * 100}%` }}
            />
          ))}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
            {series.map((line) => (
              <polyline
                key={line.name}
                points={line.values.map((value, index) => `${xOf(index)},${yOf(value)}`).join(" ")}
                fill="none"
                stroke={line.color}
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          {series.map((line) =>
            line.values.map((value, index) => (
              <span
                key={`${line.name}-${index}`}
                className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] bg-surface"
                style={{ left: `${xOf(index)}%`, top: `${yOf(value)}%`, borderColor: line.color }}
              />
            )),
          )}
        </div>
        <span />
        <div className="mt-2 grid text-center text-xs" style={{ gridTemplateColumns: `repeat(${labels.length}, 1fr)` }}>
          {labels.map((label) => (
            <span key={label} className="truncate">
              {label}
            </span>
          ))}
        </div>
      </div>

      <figcaption className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px]">
        {series.map((line) => (
          <span key={line.name} className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2" style={{ backgroundColor: line.color }} />
            {line.name}
          </span>
        ))}
      </figcaption>

      {/* sr-only on a <table> itself still lets its cells widen the page. */}
      <div className="sr-only">
        <table>
          <caption>{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Periode</th>
              {series.map((line) => (
                <th key={line.name} scope="col">
                  {line.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {labels.map((label, index) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                {series.map((line) => (
                  <td key={line.name}>{line.values[index]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
