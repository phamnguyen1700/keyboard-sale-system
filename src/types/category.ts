export interface ICategory {
    id: number;
    name: string;
    description: string;
    productCount: number;
    subCategories: ICategory[];
  }
  export type CategoryList = ICategory[];
  