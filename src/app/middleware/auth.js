
import jwt from "jsonwebtoken";
import config from "../config";


export const auth = (...requiredRoles) => {
  return (req, res, next) => {
    try {
     
      const token =
        req.cookies?.accessToken ||
        req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      // verify token
      const decoded = jwt.verify(token, config.jwt_access_secret);

      req.user = decoded;

      if (
        requiredRoles.length &&
        !requiredRoles.includes(decoded.role)
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};
