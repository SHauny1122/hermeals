import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { weightService, WeightEntry } from '../services/weightService';

const WeightTracker: React.FC = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [newWeight, setNewWeight] = useState('');
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [loading, setLoading] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      loadEntries();
    }
  }, [user]);

  const loadEntries = async () => {
    if (!user) return;
    try {
      const data = await weightService.getWeightEntries(user.uid);
      setEntries(data);
    } catch (error) {
      console.error('Error loading weight entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newWeight) return;

    try {
      const entry: Omit<WeightEntry, 'id'> = {
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(newWeight),
        unit
      };

      await weightService.addWeightEntry(user.uid, entry);
      setNewWeight('');
      loadEntries();
    } catch (error) {
      console.error('Error adding weight entry:', error);
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (!user) return;
    try {
      await weightService.deleteWeightEntry(user.uid, entryId);
      loadEntries();
    } catch (error) {
      console.error('Error deleting weight entry:', error);
    }
  };

  // Enhanced chart rendering with animations and interactivity
  const renderChart = () => {
    if (!entries || entries.length < 1) return null;

    const width = 600;
    const height = 300;
    const padding = 60;
    const pointRadius = 6;
    const hoverRadius = 8;

    // Sort entries by timestamp instead of date
    const sortedEntries = [...entries]
      .filter(entry => entry && entry.date && entry.weight)
      .sort((a, b) => {
        // First try to sort by timestamp
        if (a.timestamp && b.timestamp) {
          return a.timestamp - b.timestamp;
        }
        // Fall back to date if timestamp is not available
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

    if (sortedEntries.length === 0) return null;

    const weights = sortedEntries.map(e => e.weight);
    const dates = sortedEntries.map(e => new Date(e.date));

    const maxWeight = Math.max(...weights);
    const minWeight = Math.min(...weights);
    const range = maxWeight - minWeight || maxWeight * 0.2;
    const buffer = range * 0.1;

    const getX = (index: number) => padding + (index * (width - 2 * padding)) / Math.max(sortedEntries.length - 1, 1);
    const getY = (weight: number) => 
      height - padding - ((weight - (minWeight - buffer)) * (height - 2 * padding)) / (range + 2 * buffer);

    // Calculate tick values for Y axis
    const yTickCount = 5;
    const yTicks = Array.from({ length: yTickCount }).map((_, i) => {
      const weight = minWeight - buffer + (i * (range + 2 * buffer) / (yTickCount - 1));
      return {
        value: weight,
        y: getY(weight)
      };
    });

    // Calculate tick values for X axis
    const xTickCount = Math.min(sortedEntries.length, 5);
    const xTicks = Array.from({ length: xTickCount }).map((_, i) => {
      const index = Math.floor((i * (sortedEntries.length - 1)) / Math.max(xTickCount - 1, 1));
      return {
        date: dates[index],
        x: getX(index)
      };
    });

    const points = sortedEntries.map((entry, i) => ({
      x: getX(i),
      y: getY(entry.weight),
      weight: entry.weight,
      date: new Date(entry.date)
    }));

    // Create the line path
    const linePath = points.length > 1 
      ? points.map((point, i) => (i === 0 ? 'M' : 'L') + point.x + ',' + point.y).join(' ')
      : `M${points[0].x},${points[0].y}`;

    // Create the gradient area under the line
    const areaPath = points.length > 1
      ? `${linePath} L${getX(points.length - 1)},${height - padding} L${padding},${height - padding} Z`
      : `M${points[0].x},${points[0].y} L${points[0].x},${height - padding} L${padding},${height - padding} Z`;

    return (
      <div className="relative" ref={chartRef}>
        <svg width={width} height={height} className="bg-white rounded-lg shadow-sm">
          {/* Background grid */}
          {yTicks.map((tick, i) => (
            <line
              key={`grid-${i}`}
              x1={padding}
              y1={tick.y}
              x2={width - padding}
              y2={tick.y}
              stroke="#f0f0f0"
              strokeWidth="1"
            />
          ))}

          {/* Area under the line */}
          <path
            d={areaPath}
            fill="url(#gradient)"
            opacity="0.2"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Main line */}
          <path
            d={linePath}
            fill="none"
            stroke="#4F46E5"
            strokeWidth="3"
            className="transition-all duration-300"
          />

          {/* Y-axis labels */}
          {yTicks.map((tick, i) => (
            <g key={`y-tick-${i}`}>
              <line
                x1={padding - 5}
                y1={tick.y}
                x2={padding}
                y2={tick.y}
                stroke="#666"
                strokeWidth="1"
              />
              <text
                x={padding - 10}
                y={tick.y}
                textAnchor="end"
                alignmentBaseline="middle"
                fill="#666"
                fontSize="12"
              >
                {tick.value.toFixed(1)} {unit}
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {xTicks.map((tick, i) => {
            if (!tick.date) return null;
            return (
              <g key={`x-tick-${i}`}>
                <line
                  x1={tick.x}
                  y1={height - padding}
                  x2={tick.x}
                  y2={height - padding + 5}
                  stroke="#666"
                  strokeWidth="1"
                />
                <text
                  x={tick.x}
                  y={height - padding + 20}
                  textAnchor="middle"
                  fill="#666"
                  fontSize="12"
                >
                  {tick.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </text>
              </g>
            );
          })}

          {/* Data points */}
          {points.map((point, i) => (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredPoint === i ? hoverRadius : pointRadius}
                fill={hoveredPoint === i ? '#4338CA' : '#4F46E5'}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              {hoveredPoint === i && (
                <g>
                  {/* Tooltip */}
                  <rect
                    x={point.x - 50}
                    y={point.y - 40}
                    width="100"
                    height="30"
                    rx="4"
                    fill="#1F2937"
                  />
                  <text
                    x={point.x}
                    y={point.y - 20}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                  >
                    {`${point.weight}${unit} - ${new Date(point.date).toLocaleTimeString(undefined, { 
                      hour: '2-digit', 
                      minute: '2-digit'
                    })}`}
                  </text>
                </g>
              )}
            </g>
          ))}

          {/* Axes */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#666"
            strokeWidth="1"
          />
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#666"
            strokeWidth="1"
          />
        </svg>
      </div>
    );
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  // Calculate weight change statistics
  const getWeightChangeStats = () => {
    if (!entries || entries.length < 2) return null;
    
    const sortedEntries = [...entries]
      .filter(entry => entry && entry.date && entry.weight) // Filter out invalid entries
      .sort((a, b) => {
        // First try to sort by timestamp
        if (a.timestamp && b.timestamp) {
          return a.timestamp - b.timestamp;
        }
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    const firstWeight = sortedEntries[0].weight;
    const lastWeight = sortedEntries[sortedEntries.length - 1].weight;
    const change = lastWeight - firstWeight;
    const percentChange = (change / firstWeight) * 100;
    
    return {
      change: change.toFixed(1),
      percentChange: percentChange.toFixed(1),
      isGain: change > 0
    };
  };

  const stats = getWeightChangeStats();

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Weight Tracker</h2>
        {stats && (
          <div className="flex gap-4 text-sm">
            <span className={`font-medium ${stats.isGain ? 'text-red-600' : 'text-green-600'}`}>
              {stats.isGain ? '+' : ''}{stats.change} {unit}
            </span>
            <span className="text-gray-500">
              ({stats.isGain ? '+' : ''}{stats.percentChange}% overall)
            </span>
          </div>
        )}
      </div>
      
      {/* Add new entry form */}
      <form onSubmit={handleAddEntry} className="mb-6">
        <div className="flex gap-2">
          <input
            type="number"
            step="0.1"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="Enter weight"
            className="px-3 py-2 border rounded-md flex-1"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'kg' | 'lbs')}
            className="px-3 py-2 border rounded-md"
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add Entry
          </button>
        </div>
      </form>

      {/* Weight chart */}
      <div className="mb-6 overflow-x-auto">
        {entries.length > 0 ? renderChart() : (
          <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">Add weight entries to see your progress chart</p>
          </div>
        )}
      </div>

      {/* Weight entries list */}
      <div className="space-y-2">
        {entries
          .filter(entry => entry && entry.date && entry.weight)
          .sort((a, b) => {
            // Sort by timestamp in reverse order for the list
            if (a.timestamp && b.timestamp) {
              return b.timestamp - a.timestamp;
            }
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          })
          .map((entry) => (
            <div
              key={entry.id}
              className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <span className="font-medium">{entry.weight} {entry.unit}</span>
                <span className="text-gray-500 ml-2">
                  {new Date(entry.date).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <button
                onClick={() => entry.id && handleDeleteEntry(entry.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeightTracker;
