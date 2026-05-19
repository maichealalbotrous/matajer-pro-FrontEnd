import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserPlus, User, Phone, Lock } from 'lucide-react';
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';


function EmployeeModal({ isOpen, onClose, onSave, employee = null }) {
  const [formData, setFormData] = useState({ name: '', phone: '', password: '' });

  useEffect(() => {
    if (isOpen) {
      if (employee) {
        setFormData({ name: employee.name, phone: employee.phone, password: '' });
      } else {
        setFormData({ name: '', phone: '', password: '' });
      }
    }
  }, [employee, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
        alert("يرجى ملء الحقول الأساسية المطلوبة");
        return;
    }

    const dataToSave = {
      name: formData.name,
      phone: formData.phone,
    };

    // إرسال كلمة المرور فقط في حال الإضافة الجديدة أو إذا قام المدير بكتابة كلمة جديدة لتحديثها
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
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="اسم الموظف الثلاثي"
          />
          <MyInput 
            LabelTitle={"رقم الهاتف"} 
            icon={<Phone size={18}/>} 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="09xxxxxxxx"
          />
          <MyInput 
            LabelTitle={employee ? "كلمة المرور الجديدة (اتركها فارغة لعدم التغيير)" : "كلمة المرور"}
            type="password"
            placeholder="........"
            icon={<Lock size={18}/>} 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <MyButton
            title={employee ? "تحديث بيانات الموظف" : "إضافة الموظف للفرع"} 
            type="submit"
            className="w-full mt-4 py-4 bg-[#0f172a] text-white rounded-2xl font-black shadow-xl"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeModal;