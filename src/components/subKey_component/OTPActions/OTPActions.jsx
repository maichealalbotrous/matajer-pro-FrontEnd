import { RefreshCcw, RefreshCcwIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

const OTPActions = ({ onVerify, isSubmitting, isValid }) => (
  <div className="space-y-6 pt-4 w-full">
    <Button 
      onClick={onVerify}
      disabled={!isValid || isSubmitting}
      className="w-full py-7 bg-[#050b1a] hover:bg-[#0a1429] text-white rounded-[24px] font-black text-lg transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-black/10"
    >
      {isSubmitting ? "جاري التحقق..." : "تأكيد الرمز"}
    </Button>

  
  </div>
);

export default OTPActions;