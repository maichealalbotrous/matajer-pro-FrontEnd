import SettlementItemCard from '@/components/Admin_component/Sales_Components/SettlementItemCard/SettlementItemCard';
import Settlements from '@/components/Admin_component/Sales_Components/SettlementsManager/Settlements';
import { Search, Plus, Filter, Download } from 'lucide-react';



function Settlements_page() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10" dir="rtl">
      <Settlements/>
    </div>
  );
}

export default Settlements_page;