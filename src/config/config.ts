const config = {
  mongodb: {
    URI: process.env.MONGODB_URL || 'mongodb://localhost:27017/recipemug',
    options: {
      autoIndex: false, // Don't build indexes
      reconnectTries: 10, // Retry up to 10 times
      reconnectInterval: 1000, // Reconnect every 1s
      bufferMaxEntries: 0,
      useNewUrlParser: true
    }
  },
  jwt: {
    secretOrKey: process.env.JWT_KEY ||'top_secret'
  },
  cors: {
    origin: ['https://new.recipemug.club', 'https://api.recipemug.club', 'https://recipemug.club'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
  }
}

export default config
