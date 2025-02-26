import { Injectable, NotFoundException ,BadRequestException,ForbiddenException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { User } from '../user/entities/user.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Menu) private menuRepo: Repository<Menu>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Restaurant) private restaurantRepo: Repository<Restaurant>
    
  ) {}

 
  async addItemToCart(userId: number, createCartDto: CreateCartDto) {
    const { menuItemId, quantity } = createCartDto;

    // Find the menu item and include its associated restaurant
    const menuItem = await this.menuRepo.findOne({
        where: { id: menuItemId },
        relations: ['restaurant'], // Include restaurant data
    });

    if (!menuItem) {
        throw new NotFoundException('Menu item not found');
    }

    // Get restaurantId dynamically
    const restaurantId = menuItem.restaurant?.id;
    if (!restaurantId) {
        throw new NotFoundException('Restaurant not found for this menu item');
    }

    // Find user
    const user = await this.userRepo.findOne({ where: { id:userId } });
    
    if (!user) {
        throw new NotFoundException('User not found');
    }

    // Check if the item is already in the cart
    let cartItem = await this.cartRepo.findOne({
        where: { user: { id: userId }, menu: { id: menuItemId } },
        relations: ['menu', 'user', 'restaurant'], 
    });

    if (cartItem) {
        // If item exists
        cartItem.quantity += quantity;
        cartItem.totalPrice = cartItem.menu.price * cartItem.quantity;
    } else {
        //  create a new cart entry
        cartItem = this.cartRepo.create({
            menu: menuItem,
            user: user,
            quantity,
            totalPrice: menuItem.price * quantity,
            restaurant: { id: restaurantId },
        });
    }

    const savedCartItem = await this.cartRepo.save(cartItem);

    
    return {
        id: savedCartItem.id,
        quantity: savedCartItem.quantity,
        totalPrice: savedCartItem.totalPrice,
        restaurant: { id: restaurantId, name: menuItem.restaurant.name }, 
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        menu: { 
            id: menuItem.id, 
            item_name: menuItem.item_name, 
            price: menuItem.price, 
            description: menuItem.description 
        }
    };
}

async getCartItems(userId: number): Promise<Cart[]> {
  return await this.cartRepo.find({
    where: { user: { id: userId } },
    relations: ['menu', 'restaurant'], // Load related menu and restaurant details
  });
}

async updateCartItem(userId: number, cartId: number, updateCartDto: UpdateCartDto): Promise<Cart> {
  // Find the cart item that belongs to the logged-in user
  const cartItem = await this.cartRepo.findOne({
    where: { id: cartId, user: { id: userId } },
    relations: ['menu'],
  });
  if (!cartItem) {
    throw new NotFoundException('Cart item not found');
  }

  if (updateCartDto.quantity) {
    cartItem.quantity = updateCartDto.quantity;
    
    cartItem.totalPrice = Number(cartItem.menu.price) * cartItem.quantity;
  }

  

  return await this.cartRepo.save(cartItem);
}
async removeCartItem(userId: number, cartId: number): Promise<{ message: string }> {

  const cartItem = await this.cartRepo.findOne({ 
    where: { id: cartId, user: { id: userId } },
  });
  
  if (!cartItem) {
    throw new NotFoundException('Cart item not found');
  }

  await this.cartRepo.remove(cartItem);

  return { message: 'Cart item removed successfully' };
}

}