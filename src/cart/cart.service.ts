import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { User } from '../user/entities/user.entity';
import { Menu } from '../menu/entities/menu.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const user = await this.userRepository.findOne({ where: { id: createCartDto.userId } });
    const menu = await this.menuRepository.findOne({ where: { id: createCartDto.menuId } });

    if (!user || !menu) {
      throw new NotFoundException('User or Menu not found');
    }

    const cart = this.cartRepository.create({
      user,
      menu,
      quantity: createCartDto.quantity,
      totalPrice: menu.price * createCartDto.quantity,
    });

    return this.cartRepository.save(cart);
  }

  findAll() {
    return this.cartRepository.find({ relations: ['user', 'menu'] });
  }

  findOne(id: number) {
    return this.cartRepository.findOne({ where: { id }, relations: ['user', 'menu'] });
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepository.preload({
      id,
      ...updateCartDto,
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return this.cartRepository.save(cart);
  }

  async remove(id: number) {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return this.cartRepository.remove(cart);
  }
}
