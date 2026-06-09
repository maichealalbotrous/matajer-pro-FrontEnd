import React, { useState, useEffect } from 'react';
import { Plus, X, RefreshCw } from 'lucide-react';
import { fetchBranchesFromServer } from '../Branch_card/lib';
import BranchCard from '../Branch_card/BranchCard';
import AddBranchForm from '../AddBranchForm/AddBranchForm';
import BranchHeader from '../Branch_Header/BranchHeader';
import { useNavigate } from 'react-router-dom';

function Branches() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [branchesList, setBranchesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // 💡 دالة فحص صلاحية إظهار زر "إضافة فرع جديد" بأمان تام
  const canAddBranch = () => {
    try {
      const userRaw = localStorage.getItem('user');
      if (!userRaw) return false; // إذا لم يكن هناك مستخدم مسجل
      
      const userObj = JSON.parse(userRaw);
      // التحقق من أن للمستخدم صلاحية (مثلاً branch_id الخاص به يساوي null كمدير عام، أو حسب منطق تطبيقك)
      return userObj && (!userObj.branch_id || userObj.branch_id === null);  
      }
       catch (error) {
      console.error("خطأ في قراءة بيانات المستخدم من local storage:", error);
      return false;
    }
  };

  const loadBranchesData = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const data = await fetchBranchesFromServer();
      if (data && !Array.isArray(data)) {
        setBranchesList([data]);
      } else {
        setBranchesList(data || []);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBranchesData();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f8fafc]" dir="rtl"> 
      <BranchHeader />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center mt-8">
        <button 
          onClick={loadBranchesData}
          className="p-3 bg-white text-slate-600 rounded-2xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-all active:scale-95"
          title="تحديث البيانات"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        </button>

        {/* 💡 استخدام الدالة الآمنة بعد فك كائن الـ JSON لمنع الـ Crash */}
        {canAddBranch() && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#050b1a] hover:bg-[#0a1429] text-white font-black text-sm rounded-2xl shadow-lg shadow-black/5 transition-all active:scale-[0.98]"
          >
            <Plus size={18} />
            <span>إضافة فرع جديد</span>
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto min-h-[200px] mt-6 px-6 md:px-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0f172a]"></div>
          </div>
        ) : errorMessage ? (
          <div className="text-center py-16 px-4">
            <p className="text-red-500 font-bold mb-3">{errorMessage}</p>
            <button onClick={loadBranchesData} className="text-xs font-black text-[#3198c1] underline">إعادة المحاولة</button>
          </div>
        ) : (
          <BranchCard onClick={() => { navigate('/AdminDashboard') }} BrachData={branchesList} Employee={[]} />
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 left-6 p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition-colors z-10"
            >
              <X size={18} />
            </button>
            
            <AddBranchForm onBranchAdded={() => {
              setIsModalOpen(false);
              loadBranchesData();
            }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Branches;