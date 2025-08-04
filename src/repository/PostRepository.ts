import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";

export class PostRepository {
  private repository: Repository<Post>;

  constructor() {
    this.repository = AppDataSource.getRepository(Post);
  }

  /**
   * Create a new post
   */
  async create(postData: Partial<Post>): Promise<Post> {
    const post = this.repository.create(postData);
    return await this.repository.save(post);
  }

  /**
   * Find all posts, optionally load user
   */
  async findAll(withUser: boolean = false): Promise<Post[]> {
    if (withUser) {
      return await this.repository.find({ relations: ["user"] });
    }
    return await this.repository.find();
  }

  /**
   * Find post by id, optionally load user
   */
  async findById(id: number, withUser: boolean = false): Promise<Post | null> {
    if (withUser) {
      return await this.repository.findOne({ where: { id }, relations: ["user"] });
    }
    return await this.repository.findOne({ where: { id } });
  }

  /**
   * Update post
   */
  async update(id: number, postData: Partial<Post>): Promise<Post | null> {
    await this.repository.update(id, postData);
    return await this.findById(id);
  }

  /**
   * Delete post
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Find posts by user id, optionally load user
   */
  async findByUserId(userId: number, withUser: boolean = false): Promise<Post[]> {
    if (withUser) {
      return await this.repository.find({ where: { user: { id: userId } }, relations: ["user"] });
    }
    return await this.repository.find({ where: { user: { id: userId } } });
  }
}
