import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {

    const { token } = req.headers;
    if (!token)
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });


    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decoded.role || decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not Authorized" });
    }


    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default adminAuth;
