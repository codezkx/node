class ProductService {
  static async getProductDetails(productId: string | number) {
    return {
      name: 'userProfile',
      service: 'productService',
      endpoint: `/products/${productId}`,
      method: 'GET',
      transform: (data: any) => ({
        productId: data.id,
        title: data.title,
        price: data.price,
        inventory: data.inventory
      })
    };
  }

  static async getProductRecommendations(userId: string | number) {
    return {
      name: 'userOrders',
      service: 'productService',
      endpoint: '/products/recommendations',
      method: 'GET',
      mapParams: (context) => ({
        params: { userId: context.params.userId }
      })
    };
  }
}

export default ProductService;