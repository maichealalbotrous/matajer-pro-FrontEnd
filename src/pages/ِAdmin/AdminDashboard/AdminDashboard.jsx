import React, { useState } from 'react'
import HeaderDashboard from '@/components/Admin_component/HeaderDashboard/HeaderDashboard'
import SideBarDashboard from '@/components/Admin_component/SideBarDashboard/SideBarDashboard'
import InformationCard from '@/components/Admin_component/InformationCard/InformationCard'
import InvoicesCard from '@/components/Admin_component/Invoices/InvoicesCard/InvoicesCard'
import BranchesOverviewCard from '@/components/Branch_component/BranchesOverviewCard/BranchesOverviewCard'
import EmployeesMiniCard from '@/components/Admin_component/Employee/EmployeesMiniCard/EmployeesMiniCard'
import InventoryCard from '@/components/Admin_component/Inventory/InventoryCard/InventoryCard'

//test data///////////////////////////////////////
import { testEmployees } from '@/components/Admin_component/Employee/EmployeesMiniCard/lib';
import {testInvoices} from '@/components/Admin_component/Invoices/InvoicesCard/lib';
import {testinformationData} from '@/components/Admin_component/InformationCard/lib';
import ProductsStateCard from '@/components/Admin_component/Products/ProductsStatCard/ProductsStatCard'
import { testInventoryData } from '@/components/Admin_component/Inventory/InventoryCard/lib.jsx';
import { testProductsData } from '@/components/Admin_component/Products/ProductsStatCard/lib'
import ExpensesCard from '@/components/Admin_component/Expenses/ExpensesCard/ExpensesCard'
import DiscountsStatsCard from '@/components/Admin_component/Discounts/DiscountsStatsCard/DiscountsStatsCard'
//test data///////////////////////////////////////

function AdminDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden" dir="rtl">
      
      {/* SideBarDashboard*/}
      <SideBarDashboard isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        
              {/* HeaderDashboard*/}

        <HeaderDashboard 
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)} 
          isOpen={isMenuOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 transition-all duration-300">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-[#0f172a]">مرحباً بك في لوحة التحكم</h1>
              <p className="text-slate-400 font-bold">هذه نظرة عامة على أداء النظام اليوم.</p>
            </div>

              {/* InformationCard*/}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <InformationCard InformationData={testinformationData}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
               {/* InvoicesCard*/}

              <div className="md:col-span-5">
                <InvoicesCard invoices={testInvoices} />
              </div>

               {/* BranchesOverviewCard*/}

              <div className="md:col-span-7">
                <BranchesOverviewCard BranchCount={12} />
              </div>

               {/* ProductsStateCard*/}

              <div className="md:col-span-4">
                <ProductsStateCard ProductsData={testProductsData[0]} />
              </div>

               {/* EmployeesMiniCard*/}

              <div className="md:col-span-4">
                <EmployeesMiniCard EmployeeData={testEmployees}/>
              </div>

               {/* InventoryCard*/}

              <div className="md:col-span-4">
                <InventoryCard InventoryData={testInventoryData[0]} />
              </div>


              {/*Expenses */}

              <div className="md:col-span-4">
                <ExpensesCard amount={128400} />
              </div>


              
              <div className="md:col-span-4 float-start">
                <DiscountsStatsCard amount={128400} />
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard