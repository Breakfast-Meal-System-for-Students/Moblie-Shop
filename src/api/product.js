import axios from 'axios';
const API_URL_PRODUCT = 'https://bms-fs-api.azurewebsites.net/api/Product/all-product-by-shop-id';
const PAGESIZE = 2;

export const fetchProductsRecent = async (shopId, pageIndex = 1, pageSize = 5) => {
    try {
        const response = await axios.get(`https://bms-fs-api.azurewebsites.net/api/Product/all-product-by-shop-id`, {
            params: {
                id: shopId,
                pageIndex: pageIndex,
                pageSize: pageSize,
            },
            headers: {
                'accept': '*/*',
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

export const fetchProductsByShopId = async (shopId, pageIndex = 1, searchQuery = '') => {
    const url = `${API_URL_PRODUCT}?id=${shopId}&pageSize=${PAGESIZE}&pageIndex=${pageIndex}&search=${searchQuery}`; // Thêm tham số tìm kiếm

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
            },
        });

        const data = await response.json();

        if (data.isSuccess) {
            return data; // Return the product data
        } else {
            console.error('Failed to fetch products:', data.messages);
            return []; // Return an empty array on failure
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return []; // Return an empty array on error
    }
};