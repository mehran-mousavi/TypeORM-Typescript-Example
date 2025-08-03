import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import { UserRepository } from "./repository/UserRepository";

// Load environment variables
dotenv.config();

AppDataSource.initialize().then(async () => {
  console.log("Data Source has been initialized!");

  // Initialize the User repository
  const userRepository = new UserRepository();

  // Insert a user using repository
  const userData = {
    name: "Thomas",
    email: "thomas@example.com"
  };

  const newUser = await userRepository.create(userData);
  console.log("User has been saved:", newUser);

  // Query all users using repository
  const users = await userRepository.findAll();
  console.log("All users:", users);

  // Find user by email
  const foundUser = await userRepository.findByEmail("alice@example.com");
  console.log("Found user by email:", foundUser);

}).catch((error) => {
  console.error("Error during Data Source initialization", error);
});



console.log("DB_SYNCHRONIZE",process.env.DB_SYNCHRONIZE);
