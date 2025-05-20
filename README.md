# efrei_api

| Étape                                               | Statut                   |
| --------------------------------------------------- | ------------------------ |
| Projet Node.js avec Express                         | ✅ Fait                   |
| Sécurité des headers avec helmet et cors            | ✅ Fait                   |
| Authentification avec JWT (/login)                  | ✅ Fait                   |
| Middleware authenticateToken + route /protected     | ✅ Fait                   |
| Validation des entrées (express-validator)          | ✅ Fait                   |
| Limitation des requêtes avec express-rate-limit     | ✅ Fait                   |
| Lancement en HTTPS avec certificat auto-signé       | ✅ Fait                   |
| Gestion des erreurs (401, 403, 404, 500)            | ✅ Fait                   |
| Audit de sécurité des paquets (à faire vite fait)   | ✅ Fait                   | (npm audit fix)

J'ai utilisé express-validator plutot que better-validator car cela ne marchait pas sur ma machine.
