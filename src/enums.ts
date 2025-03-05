export enum UserRole {
    ADMIN = 'ADMIN',
    RESTAURANT = 'RESATAURANT',
    CUSTOMER = 'CUSTOMER',
    STAFF='STAFF',
  }
  
  export enum OrderStatus {
    PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED'
  }
  
  export enum RestaurantStatus {
    Active = 'Active',
    Inactive = 'Inactive',
  }
  export enum AvailabilityStatus {
    AVAILABLE = 'AVAILABLE',
    UNAVAILABLE = 'UNAVAILABLE',
  }
  export enum PermissionAction {
    ACTIVATE_RESTAURANT = 'ACTIVATE_RESTAURANT',
    DEACTIVATE_RESTAURANT = 'DEACTIVATE_RESTAURANT',
    DELETE_RESTAURANT = 'DELETE_RESTAURANT',
    CHECK_MENU = 'CHECK_MENU',
  }
  
  
  