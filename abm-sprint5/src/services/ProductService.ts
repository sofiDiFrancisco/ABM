import { Producto } from '../types/Product';


const BASE_URL = 'https://example-service-thrid.onrender.com';


export const ProductService = {

    getProducts: async (): Promise<Producto[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/producto`);
        const data = await response.json();
        return data;
    },

    getProduct: async (id: number): Promise<Producto> => {
        const response = await fetch(`${BASE_URL}/api/v1/producto/${id}`);
        const data = await response.json();
        return data;
    },

    createProduct: async (producto: Producto): Promise<Producto> => {
        const response = await fetch(`${BASE_URL}/api/v1/producto`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        const data = await response.json();
        return data;
    },

    updateProduct: async (id: number, producto: Producto): Promise<Producto> => {
        const response = await fetch(`${BASE_URL}/api/v1/producto/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        const data = await response.json();
        return data;
    },

    deleteProduct: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/producto/${id}`, {
            method: "DELETE"
        });
    }

};
