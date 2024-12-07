import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { useTodoStore } from '../store/todo-store';
import { motion } from 'framer-motion';
import { colors } from '../lib/colors';

export const Stats: React.FC = () => {
  const stats = useTodoStore((state) => state.getStats());

  const priorityData = Object.entries(stats.byPriority).map(([name, value]) => ({
    name,
    value,
  }));

  const categoryData = Object.entries(stats.byCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const weeklyData = stats.weeklyProgress.map((value, index) => ({
    name: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index],
    value,
  }));

  // Enhanced color schemes for charts
  const CHART_COLORS = {
    priority: [
      colors.priority.low,    // Low priority
      colors.priority.medium, // Medium priority
      colors.priority.high,   // High priority
    ],
    category: [
      colors.category.work,     // Work
      colors.category.personal, // Personal
      colors.category.shopping, // Shopping
      colors.category.health,   // Health
      colors.category.other,    // Other
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
    >
      <div className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-xl font-bold mb-4" style={{ color: colors.text.primary }}>Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
               style={{ backgroundColor: colors.mint }}>
            <p style={{ color: colors.text.secondary }} className="text-sm">Total Tasks</p>
            <p className="text-2xl font-bold" style={{ color: colors.text.primary }}>{stats.total}</p>
          </div>
          <div className="p-4 rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
               style={{ backgroundColor: colors.sage }}>
            <p style={{ color: colors.text.secondary }} className="text-sm">Completed Today</p>
            <p className="text-2xl font-bold" style={{ color: colors.text.primary }}>
              {stats.todayCompleted}
            </p>
          </div>
          <div className="p-4 rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
               style={{ backgroundColor: colors.pastelYellow }}>
            <p style={{ color: colors.text.secondary }} className="text-sm">Completion Rate</p>
            <p className="text-2xl font-bold" style={{ color: colors.text.primary }}>
              {stats.completionRate.toFixed(1)}%
            </p>
          </div>
          <div className="p-4 rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
               style={{ backgroundColor: colors.lightPink }}>
            <p style={{ color: colors.text.secondary }} className="text-sm">Active Tasks</p>
            <p className="text-2xl font-bold" style={{ color: colors.text.primary }}>{stats.active}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-xl font-bold mb-4" style={{ color: colors.text.primary }}>Weekly Progress</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <XAxis dataKey="name" stroke={colors.text.secondary} />
              <YAxis stroke={colors.text.secondary} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '2px solid black',
                  borderRadius: '8px',
                  boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={colors.background.accent}
                strokeWidth={2}
                dot={{ 
                  fill: colors.background.accent,
                  strokeWidth: 2,
                  r: 4,
                  stroke: 'black'
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-xl font-bold mb-4" style={{ color: colors.text.primary }}>Tasks by Priority</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priorityData}>
              <XAxis 
                dataKey="name" 
                stroke={colors.text.secondary}
                tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
              />
              <YAxis stroke={colors.text.secondary} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '2px solid black',
                  borderRadius: '8px',
                  boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)'
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {priorityData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CHART_COLORS.priority[index]}
                    stroke="black"
                    strokeWidth={2}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-xl font-bold mb-4" style={{ color: colors.text.primary }}>Tasks by Category</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
                labelLine={{ stroke: 'black', strokeWidth: 1 }}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS.category[index]}
                    stroke="black"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '2px solid black',
                  borderRadius: '8px',
                  boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};