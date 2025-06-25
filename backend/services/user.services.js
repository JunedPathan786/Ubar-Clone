const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  // ✅ Check if email already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // ✅ Create new user
  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};
