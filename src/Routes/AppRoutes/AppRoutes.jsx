import ProductVariantsPage from "@/components/Admin_component/Products/ProductVariantsPage/ProductVariantsPage";
import Auth_page from "@/pages/Auth/Auth_page";
import AdminDashboard from "@/pages/ِAdmin/AdminDashboard/AdminDashboard";
import Inventory_page from "@/pages/ِAdmin/Inventory/Inventory_page";
import Invoices_page from "@/pages/ِAdmin/Invoices/Invoices_page";
import Products_page from "@/pages/ِAdmin/Products/Products_page";
import Reports from "@/pages/ِAdmin/Reports/Reports";
import Settlements_page from "@/pages/ِAdmin/Settlements/Settlements_page";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Employee_page from "@/pages/ِAdmin/Employee/Employee_page";
import Expenses_page from "@/pages/ِAdmin/Expenses_page/Expenses_page";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/Auth" element={<Auth_page />} />
      <Route
        path="/AdminDashboard"
        element={
          <ProtectedRoute>
            <>
              <AdminDashboard />
              </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/Inventory"
        element={
          <ProtectedRoute>
            <>
              <Inventory_page />
              </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/Invoices"
        element={
          <ProtectedRoute>
            <>
              <Invoices_page />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/Settlements"
        element={
          <ProtectedRoute>
            <>
              <Settlements_page />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <>
              <Products_page />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/:product_id/variants"
        element={
          <ProtectedRoute>
            <>
              <ProductVariantsPage />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/Reports"
        element={
          <ProtectedRoute>
            <>
              <Reports />
            </>
          </ProtectedRoute>
        }
      />

       <Route
        path="/Employees"
        element={
          <ProtectedRoute>
            <>
              <Employee_page />
            </>
          </ProtectedRoute>
        }
      />

       <Route
        path="/Expenses"
        element={
          <ProtectedRoute>
            <>
              <Expenses_page />
            </>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/AdminDashboard" />} />
      <Route path="*" element={<div>404 - الصفحة غير موجودة</div>} />
    </Routes>
  );
}