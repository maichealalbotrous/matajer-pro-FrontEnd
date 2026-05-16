import React from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '../ui/button';

const Public_Alert = ({ isVisible , title,dis}) => {

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-8 z-50 animate-in fade-in slide-in-from-bottom-4">
      
      <Alert className="max-w-md bg-[#050b1a] border-none text-white rounded-[24px] p-6 shadow-2xl">
        <div className="flex items-start gap-4 text-right" dir="rtl">
          <CheckCircle2Icon className="text-green-400 w-6 h-6 shrink-0 mt-1" />
          
          <div className="flex-1 flex flex-col"> 
            <AlertTitle className="font-black text-lg mb-1 leading-none">
             {title}
            </AlertTitle>
            
            <AlertDescription className="text-slate-400 font-bold text-sm">
                {dis}
            </AlertDescription>
            
       
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default Public_Alert;