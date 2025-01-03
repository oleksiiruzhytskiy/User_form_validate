const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
app.use(cookieParser()); // Use cookie-parser middleware
const SECRET_KEY = "your_secret_key"
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your front-end's URL
    credentials: true,
  })
);
app.use(express.json());
app.post("/register", async (req, res) => {
  const { user, password } = req.body;
  const userCookie = req.cookies.username; // Access specific cookie
  if (userCookie === user) {
    return res.status(409).json({ message: "User already exists" });
  }
  console.log(user, password);
  if (!user || !password) {
    return res.status(400).send("Invalid entry. Please try again.");
  }
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store username and hashed password in cookies (for demonstration only)
    res.cookie("username", user, { httpOnly: true, maxAge: 86400 * 1000 });
    res.cookie("password", hashedPassword, { httpOnly: true, maxAge: 86400 * 1000 });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).send("Server error");
  }
});

app.post("/login", async (req, res) => {
  console.log("Request cookies:", req.cookies); // Все cookies
  const { user, password } = req.body;
  const userCookie = req.cookies.username;
  const hashedPasswordCookie = req.cookies.password;
  if (!user || !password) {
    return res.status(400).json({ message: "Invalid username or password" }); // done when the user or password is missing and removed required input attribute
  }

  try {
    // Compare the plain password with the hashed password
    const isMatch = await bcrypt.compare(password, hashedPasswordCookie);

    if (userCookie !== user || !isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate an access token
    const accessToken = jwt.sign({ username: user }, SECRET_KEY, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Respond with the token
    res.status(200).json({ message: "User logged in", accessToken: accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Server error");
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
