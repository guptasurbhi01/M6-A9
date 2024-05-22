const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  if (err) {
    res.status(400).json({ error: err.message });
  } else {
    next();
  }
});

app.post("/register", (req, res, next) => {
  const { firstName, lastName, password, email, phoneNumber } = req.body;

  try {
    validateName(firstName, "First");
    validateName(lastName, "Last");
    validatePassword(password);
    validateEmail(email);
    validatePhoneNumber(phoneNumber);

    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    next(error);
  }
});

function validateName(name, type) {
  if (!name || name.charAt(0) !== name.charAt(0).toUpperCase()) {
    throw new Error(`${type} name must start with an uppercase letter.`);
  }
}

function validatePassword(password) {
  const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
  const uppercasePattern = /[A-Z]/;
  const numericPattern = /[0-9]/;

  if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }
  if (!specialCharacterPattern.test(password)) {
    throw new Error("Password must contain at least one special character.");
  }
  if (!uppercasePattern.test(password)) {
    throw new Error("Password must contain at least one uppercase letter.");
  }
  if (!numericPattern.test(password)) {
    throw new Error("Password must contain at least one numeric character.");
  }
}

function validateEmail(email) {
  if (!email || !email.includes("@")) {
    throw new Error("Invalid email address.");
  }
}

function validatePhoneNumber(phoneNumber) {
  if (!phoneNumber || phoneNumber.length < 10) {
    throw new Error("Phone number must be at least 10 digits long.");
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
