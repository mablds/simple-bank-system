const mongoose = require('mongoose')

module.exports.connect = async() => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })

  console.log('[INFO] Mongoose connected')
}