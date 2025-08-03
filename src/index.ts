import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import { UserRepository } from "./repository/UserRepository";
import { PostRepository } from "./repository/PostRepository";

// Load environment variables
dotenv.config();

AppDataSource.initialize().then(async () => {
  console.log("Data Source has been initialized!");

  // Initialize the User and Post repositories
  const userRepository = new UserRepository();
  const postRepository = new PostRepository();

  // Insert a user using repository
  const userData = {
    name: "john Doe",
    email: "john@example.com"
  };

  const newUser = await userRepository.create(userData);
  console.log("User has been saved:", newUser);

  // Add 2 posts for the created user
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
  console.log("Posts have been saved:", [post1, post2]);

  // Query all users using repository
  const users = await userRepository.findAll();
  console.log("All users:", users);

  // Find user by email
  const foundUser = await userRepository.findByEmail("john@example.com",true);
  console.log("Found user by email:", foundUser);

  // Find Posts by user id
  const postsByUser = await postRepository.findByUserId(newUser.id, true);
  console.log("Posts by user:", postsByUser);

}).catch((error) => {
  console.error("Error during Data Source initialization", error);
});
