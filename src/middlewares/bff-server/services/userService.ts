import type { ContextOptions } from "../middlewares/aggregator";

class UserService {
  static getUserProfile() {
    return (context: ContextOptions) => ({
      name: 'userProfile', // 添加 name 到配置中
      service: 'userService',
      endpoint: `/users/${context.params.userId}`,
      method: 'GET',
      transform: (data: any) => ({
        id: data.id,
        name: data.name,
        email: data.email,
        profile: data.profile
      })
    });
  }

  static getUserOrders() {
    return (context: ContextOptions) => ({
      name: 'userOrders',
      service: 'userService',
      endpoint: `/users/${context.params.userId}/orders`,
      method: 'GET'
    });
  }
}

export default UserService;