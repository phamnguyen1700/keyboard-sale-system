import { getCategories } from "@/zustand/services/category";
import { useQuery } from "@tanstack/react-query";


export const useCategories = (includeSubCategories?: boolean, includeProductCount?: boolean) => {
    return useQuery({
        queryKey: ['categories', includeSubCategories, includeProductCount],
        queryFn: () => getCategories(includeSubCategories, includeProductCount),
    });
};