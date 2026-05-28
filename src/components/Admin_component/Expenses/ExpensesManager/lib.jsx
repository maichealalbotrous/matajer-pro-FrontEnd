import { expenseApi } from "./api";

// 1. getExpenses
export const getExpensesFromServer = async () => {
  try {
    const response = await expenseApi.get("/index");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "فشل جلب المصاريف" };
  }
};

// 2. addExpense
export const addExpenseToServer = async (expenseData) => {
  try {
    const response = await expenseApi.post("/add", expenseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "فشل تسجيل المصروف" };
  }
};

// 3. updateExpense
export const updateExpenseOnServer = async (expenseData) => {
  try {
    const response = await expenseApi.post("/update", expenseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "فشل تحديث المصروف" };
  }
};

// 4.  deleteExpense
export const deleteExpenseFromServer = async (id) => {
  try {
    const response = await expenseApi.delete('/delete', { 
      data: { id: Number(id) } 
    }); 
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "حدث خطأ أثناء حذف المصروف" };
  }
};