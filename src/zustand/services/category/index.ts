import { get } from "@/utils/Http";


export const getCategories = async (
    includeSubCategories?: boolean,
    includeProductCount?: boolean
) => {
    const params: Record<string, boolean> = {};
    if (typeof includeSubCategories === 'boolean') params.includeSubCategories = includeSubCategories;
    if (typeof includeProductCount === 'boolean') params.includeProductCount = includeProductCount;
    const res = await get('/categories', { params });
    return res.data;
};