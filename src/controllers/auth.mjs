import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

const Auth = class Auth {
  constructor(app, config) {
    this.app = app;
    this.jwtSecret = config.jwtSecret;
    this.run();
  }

  run() {
    this.app.post('/login', [
      body('username').isString().isLength({ min: 3 }),
      body('password').isString().isLength({ min: 6 })
    ],
    (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        if (username === 'admin' && password === 'admin123456') {
          const token = jwt.sign({ username }, this.jwtSecret, { expiresIn: '1h' });
          return res.status(200).json({ token });
        }

        return res.status(401).json({ message: 'Identifiants invalides' });

      } catch (err) {
        console.error("❌ ERREUR INTERNE :", err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
    });
  }
};

export default Auth;
