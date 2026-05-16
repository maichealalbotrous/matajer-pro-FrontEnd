import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import OTPHeader from '../OTPHeader/OTPHeader';
import OTPInputForm from '../OTPInputForm/OTPInputForm';
import OTPActions from '../OTPActions/OTPActions';
import Public_Alert from "@/components/public_Alert/Public_Alert"; 
import { executeBranchVerification } from './lib';


const ValidateCodeManager = () => {
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [alertConfig, setAlertConfig] = useState({
    isVisible: false,
    title: "",
    description: ""
  });

  const handleVerify = () => {
    executeBranchVerification({
      otpValue,
      setIsSubmitting,
      setAlertConfig,
      navigate
    });
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6 relative" dir="rtl">
      
      <Public_Alert 
        isVisible={alertConfig.isVisible}
        title={alertConfig.title}
        dis={alertConfig.description}
        onClose={() => setAlertConfig(prev => ({ ...prev, isVisible: false }))}
      />

      <button 
        onClick={() => navigate(-1)}
        className="absolute top-10 right-10 p-4 bg-white rounded-2xl shadow-sm hover:bg-slate-50 text-slate-400 transition-all"
      >
        <ArrowRight size={24} />
      </button>

      <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-xl shadow-slate-100 border border-slate-50 flex flex-col items-center">
        
        <OTPHeader /> 

        <OTPInputForm 
          value={otpValue} 
          onChange={(val) => setOtpValue(val)} 
        />

        <OTPActions 
          onVerify={handleVerify}
          isSubmitting={isSubmitting}
          isValid={otpValue.length === 8} 
        />
        
      </div>
    </div>
  );
};

export default ValidateCodeManager;