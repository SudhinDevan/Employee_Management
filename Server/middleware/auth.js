import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  const secretKey = 'yourSecretKey'; 
  const payload = {
    name: user.username,
    email: user.email,
  };
  const options = {
    expiresIn: '8h',
  };
  return jwt.sign(payload, secretKey, options);       
};

export const verify = (req, res, next) => {
  try {
    const token = req.header('Authorization'); 
    if (token) {
      const secretKey = process.env.JWT_SECRET;
      const verified = jwt.verify(token, secretKey);
      req.user = verified;
      next();
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ success: false });
  }
};
