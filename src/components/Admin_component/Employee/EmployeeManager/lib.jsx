import { employeeApi } from "./api";

// 1. Get All Employee
export const getEmployees = async () => {
    try {
        const response = await employeeApi.get('/my-employees');
        const data = response.data;
        return Array.isArray(data) ? data : Object.values(data);
    } catch (error) {
        throw error.response?.data || { message: "حدث خطأ أثناء جلب قائمة الموظفين" };
    }
};

// 2. Add Employee
export const addEmployee = async (employeeData) => {
    try {
        const response = await employeeApi.post('/add', employeeData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "حدث خطأ أثناء إضافة الموظف" };
    }
};

// 3. Update Employee
export const updateEmployee = async (id, employeeData) => {
    try {
        const response = await employeeApi.post('/update', { id, ...employeeData });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "حدث خطأ أثناء تحديث بيانات الموظف" };
    }
};

// 4. Delete Employee
export const deleteEmployeeFromServer = async (id) => {
    try {
        const response = await employeeApi.delete('/delete', {
            data: { id } // 🌟 يجب وضعها داخل الخاصية data حصراً ليقرأها السيرفر كـ Body
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "حدث خطأ أثناء حذف الموظف" };
    }
};