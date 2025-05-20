export default {
  development: {
    type: 'development',
    port: 3000,
    mongodb: 'mongodb+srv://noamboulze:noamboulze@efrei.q2kyc.mongodb.net/api',
    jwtSecret: 'cle_secrete_123456'

  },
  production: {
    type: 'production',
    port: 3000,
    mongodb: 'mongodb+srv://noamboulze:noamboulze@efrei.q2kyc.mongodb.net/api'
  }
};
