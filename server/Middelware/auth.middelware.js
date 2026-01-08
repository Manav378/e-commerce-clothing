import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, login again" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

    if (decodedToken.id) {
      req.userId = decodedToken.id; // corrected `UserId` → `userId` for consistency
      next();
    } else {
      return res.status(401).json({ success: false, message: "Not authorized, login again" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

export default userAuth;
