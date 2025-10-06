import type { ContextOptions } from "../middlewares/aggregator";

class ProductService {
  static getProductDetails() {
    return {
      name: 'productDetails',
      request: (context: ContextOptions) => ({
        service: 'productService',
        endpoint: `/products/${context.productId}`,
        method: 'GET',
        transform: (data: any) => ({
          productId: data.id,
          title: data.title,
          price: data.price,
          inventory: data.inventory,
          ...data
        })
      })
    }
  }

  static getProductRecommendations() {
    return {
      name: 'productRecommendations',
      request: () => ({
        service: 'productService',
        endpoint: '/products/recommendations',
        method: 'GET',
        mapParams: (context: ContextOptions) => ({
          params: { userId: context.params.userId }
        })
      })
    }
  }
}

export default ProductService;