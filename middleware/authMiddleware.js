import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  req.user = verified;
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
  next();
};

export const isModerator = (req, res, next) => {
  if (req.user.role !== 'moderator') return res.status(403).json({ message: 'Moderators only' });
  next();
};
