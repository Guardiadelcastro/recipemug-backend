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
    origin: ['https://new.recipemug.club', 'https://api.recipemug.club', 'https://recipemug.club', 'http://localhost:8008'],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  }
}

export default config
