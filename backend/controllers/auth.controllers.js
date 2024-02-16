import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    // console.log("fullName", fullName);
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "username is already taken" });
    }

    // HASH PASSWORD HERE
    // https://avatar-placeholder.iran.liara.run/
    // https://avatar.iran.liara.run/public/boy

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.fullName,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
  res.send("signup route");
};
export const login = (req, res) => {
  res.send("login route");
};
export const logout = (req, res) => {
  res.send("logout route");
};
