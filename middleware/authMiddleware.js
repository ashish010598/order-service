const axios = require("axios");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  let {userId} = req.body;
  if(req.method === 'GET') {
    userId = req.query.userId;
  }
  if (!token || !userId) {
    return res.status(401).json({ message: "Unauthorized: Missing token or userId" });
  }

  try {
    const response = await axios.post("https://0b16ffac-8740-481a-916c-bb123b0af0ac.mock.pstmn.io/tokenValidator", { userId }, {
      headers: { Authorization: token }
    });
    if (response.data.valid) {
      next(); // Token is valid, proceed
    } else {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = authMiddleware;
