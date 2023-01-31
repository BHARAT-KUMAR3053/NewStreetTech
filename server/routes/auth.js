const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.filter(
      (item) => item.username === req.body.username
    );
    console.log(user);
    if (user.length === 0) {
      res.status(401).json("Wrong credentials!");
    }

    if (user[0].password === req.body.password) {
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );

      const { password, ...others } = user[0];

      res.status(200).json({ ...others, accessToken });
    }

    res.status(401).json("wrong credentials!");
  } catch (err) {}
});

module.exports = router;
