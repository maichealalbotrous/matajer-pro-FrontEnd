import React, { useEffectEvent, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserPlus, User, Phone, Lock } from 'lucide-react';
import MyButton from '@/components/MyButton/MyButton';
import MyInput from '@/components/MyInput/MyInput'; 

function EmployeeModal({ isOpen, onClose, onSave, employee = null }) {
  const [formData, SetFormData] = useState({ name: '', phone: '', password: '' });

  useEffectEvent(() => {
    if (employee) {
      SetFormData({ name: employee.name, phone: employee.phone, password: '' });
    } else {
      SetFormData({ name: '', phone: '', password: '' });
    }
  }, [employee, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      name: formData.name,
      phone: formData.phone,
    };

    if (!employee || formData.password) {
      dataToSave.password = formData.password;
    }

    onSave(dataToSave);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[450px] rounded-[40px] border-none p-8 bg-white outline-none" showCloseButton={false}>
        <DialogHeader className="text-right">
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0f172a] mb-4">
            <UserPlus size={28} />
          </div>
          <DialogTitle className="text-2xl font-black text-[#0f172a]">
            {employee ? 'تعديل بيانات موظف' : 'إضافة موظف جديد'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-8" dir="rtl">
          <MyInput 
            LabelTitle={"اسم الموظف"} 
            icon={<User size={18}/>} 
            value={formData.name}
            onChange={(e) => SetFormData({...formData, name: e.target.value})}
            placeholder="اسم المستخدم"
          />
          <MyInput 
            LabelTitle={"رقم الهاتف"} 
            icon={<Phone size={18}/>} 
            value={formData.phone}
            onChange={(e) => SetFormData({...formData, phone: e.target.value})}
            placeholder="09xxxxxxxx"
          />
          <MyInput 
            LabelTitle={employee ? "كلمة المرور (اتركها فارغة لعدم التغيير)" : "كلمة المرور"}
            type="password"
            placeholder="........"
            icon={<Lock size={18}/>} 
            value={formData.password}
            onChange={(e) => SetFormData({...formData, password: e.target.value})}
          />
          
          <MyButton 
            title={employee ? "تحديث البيانات" : "إضافة الموظف للفرع"} 
            type="submit"
            className="w-full mt-4 py-4 bg-[#0f172a] text-white rounded-2xl font-black shadow-xl"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeModal;