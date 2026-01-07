import jwt from 'jsonwebtoken'


const authMiddelware = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Missing token",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

   
    if (!req.body) req.body = {};

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      success: false,
    });
  }
};

export default authMiddelware


