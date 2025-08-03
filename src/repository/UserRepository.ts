import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  /**
   * Create a new user
   */
  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  /**
   * Find all users
   */
  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  /**
   * Find user by id
   */
  async findById(id: number): Promise<User | null> {
    return await this.repository.findOneBy({ id });
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email });
  }

  /**
   * Update user
   */
  async update(id: number, userData: Partial<User>): Promise<User | null> {
    await this.repository.update(id, userData);
    return await this.findById(id);
  }

  /**
   * Delete user
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Check if user exists by email
   */
  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.repository.countBy({ email });
    return count > 0;
  }

  /**
   * Find users with pagination
   */
  async findWithPagination(page: number = 1, limit: number = 10): Promise<{ users: User[], total: number }> {
    const [users, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { users, total };
  }
}