import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "@/zustand/services/product/product";

export const useProductImages = (productIds: number[]) => {
  return useQuery({
    queryKey: ["product-images", productIds],
    queryFn: async () => {
      const imagePromises = productIds.map(async (id) => {
        try {
          const product = await getProductDetail(id.toString());
          return { productId: id, imageUrl: product.images?.[0]?.imageUrl || "/images/sakura.png" };
        } catch {
          return { productId: id, imageUrl: "/images/sakura.png" };
        }
      });
      
      const results = await Promise.all(imagePromises);
      const imageMap = new Map();
      results.forEach(({ productId, imageUrl }) => {
        imageMap.set(productId, imageUrl);
      });
      
      return imageMap;
    },
    enabled: productIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 