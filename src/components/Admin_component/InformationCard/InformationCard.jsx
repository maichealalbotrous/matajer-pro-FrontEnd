import React from 'react'
import { TrendingUp } from 'lucide-react' 

function InformationCard({ InformationData = [] }) {
  return (
    <>
      {InformationData.map((ele, index) => (
        <div 
          key={index} 
          className="cursor-pointer bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 max-w-[320px] transition-all hover:shadow-md group" 
          dir="rtl"
        >

          <div className="flex justify-end mb-4">
            <span className="text-slate-400 font-bold text-sm tracking-tight">
              {ele.title}
            </span>
          </div>


          <div className="flex items-baseline justify-start gap-2 mb-6">
            <h2 className="text-[#0f172a] text-4xl font-black tracking-tighter">
              {ele.amount}
            </h2>
            <span className="text-slate-400 font-bold text-lg">
              {ele.currency}
            </span>
          </div>


          <div className="flex justify-end">
            <div className="flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-full border border-green-100/50">
              <span className="text-green-600 text-sm font-black tracking-wide">
                {ele.percentage}
              </span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default InformationCard