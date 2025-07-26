export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
  categoryName: string;
  images: IImage[];
  [key: string]: unknown;
}

export interface IProductDetail {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: number;
    categoryName: string;
    images: IImage[];
}

export interface IImage {
  id: number;
  imageUrl: string;
  altText: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface IProductFilter {
  categoryId?: number;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}
export type IProductResponse = IProduct[];

