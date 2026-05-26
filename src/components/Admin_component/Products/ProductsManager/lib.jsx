import { productApi } from "./api";

// 1. getProductsFromServer
export const getProductsFromServer = async () => {
    try {
        const response = await productApi.get('/get_products');
        return response.data; 
    } catch (error) {
        throw error.response?.data || { message: "حدث خطأ أثناء جلب المنتجات" };
    }
};

// 2. addProductToServer
export const addProductToServer = async (productData) => {
    try {
        const response = await productApi.post('/store', {
            model_name: productData.model_name 
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "حدث خطأ أثناء إضافة المنتج" };
    }
};

// 3.updateProductOnServer
export const updateProductOnServer = async (productData) => {
    try {
        const response = await productApi.post('/update', {
            id: productData.id, // يمثل الـ product_id
            model_name: productData.model_name
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "حدث خطأ أثناء تحديث المنتج" };
    }
};

// 4. deleteProductFromServer
export const deleteProductFromServer = async (id) => {
    try {
        const response = await productApi.delete('/delete', { data: { id } });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "حدث خطأ أثناء حذف المنتج" };
    }
};