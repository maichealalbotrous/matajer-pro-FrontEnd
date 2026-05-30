import React, { useEffect, useState } from 'react'
import HeaderDashboard from '@/components/Admin_component/HeaderDashboard/HeaderDashboard'
import SideBarDashboard from '@/components/Admin_component/SideBarDashboard/SideBarDashboard'
import InformationCard from '@/components/Admin_component/InformationCard/InformationCard'
import InvoicesCard from '@/components/Admin_component/Invoices/InvoicesCard/InvoicesCard'
import BranchesOverviewCard from '@/components/Branch_component/BranchesOverviewCard/BranchesOverviewCard'
import EmployeesMiniCard from '@/components/Admin_component/Employee/EmployeesMiniCard/EmployeesMiniCard'
import InventoryCard from '@/components/Admin_component/Inventory/InventoryCard/InventoryCard'

// البيانات التجريبية والاحتياطية
import { testEmployees } from '@/components/Admin_component/Employee/EmployeesMiniCard/lib';
import { testInvoices } from '@/components/Admin_component/Invoices/InvoicesCard/lib';
import { testinformationData } from '@/components/Admin_component/InformationCard/lib';
import ProductsStateCard from '@/components/Admin_component/Products/ProductsStatCard/ProductsStatCard'
import ExpensesCard from '@/components/Admin_component/Expenses/ExpensesCard/ExpensesCard'
import DiscountsStatsCard from '@/components/Admin_component/Discounts/DiscountsStatsCard/DiscountsStatsCard'
import { getProductsFromServer } from '@/components/Admin_component/Products/ProductsManager/lib'
import { getDiscountsFromServer } from '@/components/Admin_component/Discounts/DiscountsManager/lib'
import { getExpensesFromServer } from '@/components/Admin_component/Expenses/ExpensesManager/lib'
import { getInventoryAuditFromServer } from '@/components/Admin_component/Inventory/InventoryManager/lib'

function AdminDashboard() {
 const [Error, setError] = useState(null);

 {/**InventorysList //////////////////////////////////////////////////////////////*/}
  const [InventorysListList, setInventorysListList] = useState([]);
  const [LoadingInventory, setLoadingInventory] = useState(true);
    const [InventoryCardData, setInventoryCardData] = useState({});
 {/**InventorysList //////////////////////////////////////////////////////////////*/}

 {/**productsList //////////////////////////////////////////////////////////////*/}
  const [productsList, setProductsList] = useState([]);
  const [Loading, setLoading] = useState(true);
 {/**productsList //////////////////////////////////////////////////////////////*/}

 {/**DiscountssList //////////////////////////////////////////////////////////////*/}
  const [DiscountssList, setDiscountssList] = useState([]);
  const [loadingDiscounts, setLoadingDiscounts] = useState(true);
 {/**DiscountssList //////////////////////////////////////////////////////////////*/}


 {/**ExpensesList //////////////////////////////////////////////////////////////*/}
  const [ExpensesList, setExpensesList] = useState([]);
  const [loadingExpenses, setLoadingExpenses] = useState(true);
 {/**ExpensesList //////////////////////////////////////////////////////////////*/}

  {/**Inventory UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}
  useEffect(() => {

    const fetchInventoryCardData = async () => {
    try {
      setLoadingInventory(true);
      const res = await getInventoryAuditFromServer();
      
      setInventorysListList(res.items || []);
   
      const totalPieces = (res.items || []).reduce((sum, item) => sum + (Number(item.total_group_qty) || 0), 0);
      
      setInventoryCardData(prev => ({
        ...prev,
        count: totalPieces,
        subtitle: totalPieces > 0 ? "حالة المخزون العام مستقرة" : "المخزون فارغ حالياً",
        type: totalPieces > 0 ? "stable" : "warning"
      }));

    } catch (error) {
      console.error("Error fetching inventory for card:", error);
    } finally {
      setLoadingInventory(false);
    }
  };
fetchInventoryCardData();
  },[])
  {/**Inventory UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}


  {/**Expenses UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoadingExpenses(true);
        const data = await getExpensesFromServer();
        setExpensesList(data);
      } catch (err) {
        console.error("فشل جلب المصاريف لكارت الإحصائيات:", err);
      } finally {
        setLoadingExpenses(false);
      }
    };

    fetchExpenses();
  }, []);

  // calculateTotalExpenses for the branch
  const calculateTotalExpenses = () => {
    if (ExpensesList.length === 0) return 0;
    
    return ExpensesList.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  };


  {/**Expenses UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}


  {/**Discunts UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        setLoadingDiscounts(true);
        const data = await getDiscountsFromServer();
        setDiscountssList(data);
      } catch (err) {
        console.error("فشل جلب الخصومات للكارت الإحصائي:", err);
      } finally {
        setLoadingDiscounts(false);
      }
    };

    fetchDiscounts();
  }, []);

  const calculateAverageDiscount = () => {
    const percentageDiscounts = DiscountssList.filter(
      d => d.discount_type === 'percentage' && d.is_active
    );

    if (percentageDiscounts.length === 0) return 0;

    const total = percentageDiscounts.reduce((sum, item) => sum + Number(item.discount_value), 0);
    
    return Math.round(total / percentageDiscounts.length);
  };
   {/**Discunts UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}


  {/**Products UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}
  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsFromServer();
        if (isMounted) {
          setProductsList(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        if (isMounted) {
          setError(err.message || "فشل تحميل المنتجات من السيرفر.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();
    return () => { isMounted = false; };
  }, []);
  {/**Products UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}



  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden" dir="rtl">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 transition-all duration-300">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-[#0f172a]">مرحباً بك في لوحة التحكم</h1>
              <p className="text-slate-400 font-bold">هذه نظرة عامة على أداء النظام اليوم.</p>
            </div>

            {/* InformationCard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <InformationCard InformationData={testinformationData}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* InvoicesCard */}
              <div className="md:col-span-5">
                <InvoicesCard invoices={testInvoices} />
              </div>

              {/* BranchesOverviewCard */}
              <div className="md:col-span-7">
                <BranchesOverviewCard BranchCount={12} />
              </div>

              {/* ProductsStateCard - تمرير آمن يحمي الكرت من الـ undefined */}
              <div className="md:col-span-4">
                <ProductsStateCard ProductsData={productsList && productsList.length > 0 ? productsList[0] : null} />
              </div>

              {/* EmployeesMiniCard */}
              <div className="md:col-span-4">
                <EmployeesMiniCard EmployeeData={testEmployees}/>
              </div>

              {/* InventoryCard */}
              <div className="md:col-span-4">
          <InventoryCard InventoryData={InventoryCardData} />   
           </div>

              {/* ExpensesCard */}
              <div className="md:col-span-4">
              <ExpensesCard 
              amount={loadingExpenses ? "..." : calculateTotalExpenses()} 
              /> 
             </div>

              {/* DiscountsStatsCard */}
             <DiscountsStatsCard 
             averageDiscount={loadingDiscounts ? "..." : calculateAverageDiscount()} 
            />

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard;