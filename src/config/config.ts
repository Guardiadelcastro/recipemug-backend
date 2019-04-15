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
    whitelist: ['https://new.recipemug.club', 'https://recipemug.club'],
    corsOptions: function (origin, callback) {
      if (this.whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
}
export default config
