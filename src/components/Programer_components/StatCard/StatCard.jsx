import React from 'react';
import { Wallet, Key, LayoutGrid } from 'lucide-react';
import {defaultStats} from './lib';
const StatCard = () => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full" dir="rtl">
      {defaultStats.map((item, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-[35px] border border-slate-100 shadow-sm flex flex-col justify-between h-44 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-slate-400 font-bold text-sm">{item.title}</h3>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.colorClass}`}>
              <item.icon size={24} />
            </div>
          </div>
          
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#0f172a]">{item.value}</span>
              <span className="text-sm font-bold text-slate-400">{item.unit}</span>
            </div>
            
            <div className="mt-2 flex items-center gap-2">
              {item.trend && (
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${item.trend > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {item.trend > 0 ? '+' : ''}{item.trend}%
                </span>
              )}
              <p className="text-slate-400 text-[11px] font-bold">{item.subValue}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCard;