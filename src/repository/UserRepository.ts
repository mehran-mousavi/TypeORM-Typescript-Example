import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Post } from "../entity/Post";

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
   * Find all users, optionally load posts
   */
  async findAll(withPosts: boolean = false): Promise<User[]> {
    if (withPosts) {
      return await this.repository.find({ relations: ["posts"] });
    }
    return await this.repository.find();
  }

  /**
   * Find user by id, optionally load posts
   */
  async findById(id: number, withPosts: boolean = false): Promise<User | null> {
    if (withPosts) {
      return await this.repository.findOne({ where: { id }, relations: ["posts"] });
    }
    return await this.repository.findOneBy({ id });
  }

  /**
   * Find user by email, optionally load posts
   */
  async findByEmail(email: string, withPosts: boolean = false): Promise<User | null> {
    if (withPosts) {
      return await this.repository.findOne({ where: { email }, relations: ["posts"] });
    }
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
   * Find users with pagination, optionally load posts
   */
  async findWithPagination(page: number = 1, limit: number = 10, withPosts: boolean = false): Promise<{ users: User[], total: number }> {
    if (withPosts) {
      const [users, total] = await this.repository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ["posts"],
      });
      return { users, total };
    }
    const [users, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { users, total };
  }

  /**
   * Load posts for a user by user id
   */
  async loadPosts(userId: number): Promise<Post[]> {
    const user = await this.repository.findOne({ where: { id: userId }, relations: ["posts"] });
    return user?.posts || [];
  }
}