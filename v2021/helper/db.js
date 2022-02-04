const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URl , { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: true  , useCreateIndex: true}).then(() => console.log("MongoDB Connection is successfully")).catch((err) => console.log(err))
}

module.exports = connectDatabase;