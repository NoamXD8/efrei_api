import jwt from 'jsonwebtoken';
import config from '../config.mjs';

const jwtSecret = config[process.argv[2]]?.jwtSecret || config.development.jwtSecret;

export default function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });
    req.user = user;
    next();
  });
}
