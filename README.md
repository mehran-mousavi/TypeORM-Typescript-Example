# 🚀 TypeORM TypeScript Example

A comprehensive **TypeORM** example project demonstrating modern TypeScript patterns, database operations, and the Repository pattern with **SQLite**.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![TypeORM](https://img.shields.io/badge/TypeORM-0.3.25-orange.svg)](https://typeorm.io/)
[![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey.svg)](https://www.sqlite.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🏗️ **TypeORM Integration** - Full ORM setup with entities, repositories, and data source configuration
- 📊 **SQLite Database** - Lightweight, file-based database perfect for learning and development
- 🔧 **Repository Pattern** - Clean architecture with custom repository implementation
- 🎯 **CRUD Operations** - Complete Create, Read, Update, Delete functionality
- 📄 **TypeScript** - Fully typed with modern ES6+ features
- 🔍 **Pagination Support** - Built-in pagination for large datasets
- ⚙️ **Environment Configuration** - Flexible setup with environment variables
- 🧪 **Production Ready** - Environment-aware configuration for different deployment stages
- 📝 **User-Post Relations** - One-to-many relation between users and posts, with full repository support

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Usage Examples](#-usage-examples)
- [API Reference](#-api-reference)
- [Configuration](#-configuration)
- [Contributing](#-contributing)

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd typescript_course
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

That's it! The application will:
- Initialize the SQLite database
- Create sample users and posts
- Demonstrate various database operations
- Display results in the console

## 📁 Project Structure

```
typescript_course/
├── src/
│   ├── entity/
│   │   ├── User.ts          # User entity definition
│   │   └── Post.ts          # Post entity definition
│   ├── repository/
│   │   ├── UserRepository.ts # Custom repository with CRUD operations for users
│   │   └── PostRepository.ts # Custom repository with CRUD operations for posts
│   ├── migrations/          # Database migrations (optional)
│   ├── data-source.ts       # TypeORM data source configuration
│   └── index.ts            # Main application entry point
├── database.sqlite         # SQLite database file (auto-generated)
├── package.json           # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 💡 Usage Examples

### Creating Users and Posts

```typescript
const userRepository = new UserRepository();
const postRepository = new PostRepository();

const newUser = await userRepository.create({
  name: "John Doe",
  email: "john@example.com"
});

const post1 = await postRepository.create({
  title: "First Post",
  content: "This is the first post.",
  user: newUser
});

const post2 = await postRepository.create({
  title: "Second Post",
  content: "This is the second post.",
  user: newUser
});
```

### Querying Users and Posts

```typescript
// Find all users with their posts
const usersWithPosts = await userRepository.findAll(true);

// Find user by email with posts
const user = await userRepository.findByEmail("john@example.com", true);

// Find all posts with their user
const postsWithUser = await postRepository.findAll(true);

// Find posts by user id
const posts = await postRepository.findByUserId(newUser.id);
```

### Updating Users and Posts

```typescript
const updatedUser = await userRepository.update(1, {
  name: "Jane Doe"
});

const updatedPost = await postRepository.update(1, {
  title: "Updated Title"
});
```

### Deleting Users and Posts

```typescript
const isUserDeleted = await userRepository.delete(1);
const isPostDeleted = await postRepository.delete(1);
```

## 🔧 API Reference

### UserRepository Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `create(userData)` | Create a new user | `Partial<User>` | `Promise<User>` |
| `findAll(withPosts?)` | Get all users, optionally with posts | `boolean?` | `Promise<User[]>` |
| `findById(id, withPosts?)` | Find user by ID, optionally with posts | `number, boolean?` | `Promise<User \| null>` |
| `findByEmail(email, withPosts?)` | Find user by email, optionally with posts | `string, boolean?` | `Promise<User \| null>` |
| `update(id, userData)` | Update user | `number, Partial<User>` | `Promise<User \| null>` |
| `delete(id)` | Delete user | `number` | `Promise<boolean>` |
| `existsByEmail(email)` | Check if email exists | `string` | `Promise<boolean>` |
| `findWithPagination(page, limit, withPosts?)` | Get paginated users, optionally with posts | `number, number, boolean?` | `Promise<{users: User[], total: number}>` |
| `loadPosts(userId)` | Get posts for a user | `number` | `Promise<Post[]>` |

### PostRepository Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `create(postData)` | Create a new post | `Partial<Post>` | `Promise<Post>` |
| `findAll(withUser?)` | Get all posts, optionally with user | `boolean?` | `Promise<Post[]>` |
| `findById(id, withUser?)` | Find post by ID, optionally with user | `number, boolean?` | `Promise<Post \| null>` |
| `update(id, postData)` | Update post | `number, Partial<Post>` | `Promise<Post \| null>` |
| `delete(id)` | Delete post | `number` | `Promise<boolean>` |
| `findByUserId(userId, withUser?)` | Get posts by user id, optionally with user | `number, boolean?` | `Promise<Post[]>` |

### User Entity

```typescript
interface User {
  id: number;          // Auto-generated primary key
  name: string;        // User's full name
  email: string;       // Unique email address
  posts: Post[];       // User's posts
}
```

### Post Entity

```typescript
interface Post {
  id: number;          // Auto-generated primary key
  title: string;       // Post title
  content: string;     // Post content
  user: User;          // Author (User)
}
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
DB_SYNCHRONIZE=true  # Auto-sync database schema (disable in production)
NODE_ENV=development # Environment mode
```

### Database Configuration

The project uses SQLite by default, but you can easily switch to other databases by modifying `src/data-source.ts`:

```typescript
export const AppDataSource = new DataSource({
  type: "postgres", // or "mysql", "mariadb", etc.
  host: "localhost",
  port: 5432,
  username: "your_username",
  password: "your_password",
  database: "your_database",
  // ... rest of configuration
});
```

## 🧪 Scripts

```bash
npm start          # Compile TypeScript and run the application
npm run typeorm    # Run TypeORM CLI commands
```

## 🤝 Contributing

Contributions are welcome! Here are some ways you can contribute:

- 🐛 **Report bugs** - Found an issue? Let us know!
- 💡 **Suggest features** - Have ideas for improvements?
- 📖 **Improve documentation** - Help make the docs better
- 🔧 **Submit pull requests** - Fix bugs or add features

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📚 Learn More

- [TypeORM Documentation](https://typeorm.io/) - Learn about TypeORM features and configuration
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Master TypeScript fundamentals
- [SQLite Documentation](https://www.sqlite.org/docs.html) - Understand SQLite database features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Show Your Support

If this project helped you learn TypeORM and TypeScript, please consider giving it a ⭐!

---

**Happy Coding!** 🎉

*Built with ❤️ using TypeORM and TypeScript*