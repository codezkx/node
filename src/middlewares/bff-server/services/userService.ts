import type { ContextOptions } from "../middlewares/aggregator";

class UserService {
  static getUserProfile() {
    return {
      name: 'userProfile',
      request: (context: ContextOptions) => ({
        service: 'userService',
        endpoint: `/users/${context.params.userId}`,
        method: 'GET',
        transform: (data: any) => ({
          id: data.id,
          name: data.name,
          email: data.email,
          profile: data.profile,
          ...data,
        })
      })
    }
  }

  static getUserOrders() {
    return {
      name: 'userOrders',
      request: (context: ContextOptions) => ({
        name: 'userOrders',
        service: 'userService',
        endpoint: `/users/${context.params.userId}/orders`,
        method: 'GET'
      })
    }
  }
}

export default UserService;