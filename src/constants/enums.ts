export enum UserRole {
    ADMIN = 'admin',
    RESTAURANT = 'restaurant',
    CUSTOMER = 'customer',
  }
  
  export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    PREPARING = 'PREPARING',
    OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED',
  }
  
  export enum RestaurantStatus {
    Active = 'Active',
    Inactive = 'Inactive',
  }
  export enum AvailabilityStatus {
    AVAILABLE = 'AVAILABLE',
    UNAVAILABLE = 'UNAVAILABLE',
  }
  