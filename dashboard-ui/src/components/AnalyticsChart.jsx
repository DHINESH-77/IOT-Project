import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'PM Kisan', engagement: 450 },
  { name: 'Awas Yojana', engagement: 320 },
  { name: 'MGNREGA', engagement: 280 },
  { name: 'Health Card', engagement: 150 },
  { name: 'Jal Jeevan', engagement: 90 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#141414] border border-white/10 p-3 rounded-lg shadow-xl">
        <p className="text-slate-300 text-sm mb-1">{payload[0].payload.name}</p>
        <p className="text-white font-semibold">{payload[0].value} physical clicks</p>
      </div>
    );
  }
  return null;
};

const AnalyticsChart = () => {
  return (
    <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white tracking-tight mb-1">Engagement Analytics</h2>
        <p className="text-sm text-slate-400">Total physical button clicks on the terminal over the past 30 days.</p>
      </div>
      
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }} 
              width={100}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="engagement" radius={[0, 4, 4, 0]} barSize={32}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#4f46e5' : '#334155'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
