export interface Product {
    id?: number;
    name: string;
    image?: string;
    price: number;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
    file?: Blob;
    file_obj?: URL | string;
}