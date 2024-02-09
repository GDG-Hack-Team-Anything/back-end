const mongoose = require('mongoose')

const dbConnect = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('database connected succefully')
    }catch(err){
        console.log('database error' + err)
    }
}

module.exports = dbConnect