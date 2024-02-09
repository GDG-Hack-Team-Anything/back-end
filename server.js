require('dotenv').config();

const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const dbConnect = require('./app/config/dbConnect');



const adminRoute = require('./app/routes/adminRoute');
const userRoute = require('./app/routes/userRoute');
const authRoute = require('./app/routes/authRoute');
const eventRoute = require('./app/routes/eventRoute');









// app.use(express.json({ limit: '1000mb' })); // Increase limit to 10 MB
// app.use(express.urlencoded({ limit: '1000mb', extended: true }));






// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


const {checkUser, requireAuth} = require('./app/middleware/userMiddleware');
const {requireAdmin, requireParticipant, requireJudge} = require('./app/middleware/userMiddleware');
// const { notFound, errorHandler } = require('./app/utils/ErrorPage');







// app.get("/home", (req, res) => {
//     res.json({ message: "Welcome secuvis" });
//   });

app.listen(process.env.PORT, async () => {
    console.log(`Server running on port ${process.env.PORT}`);
    await dbConnect();
})


app.use(checkUser);

// app.use
app.use(adminRoute);
app.use(userRoute);
app.use(authRoute);
app.use(eventRoute);



// app.use(notFound);
// app.use(errorHandler);
app.use(requireAuth);
app.use(checkUser);
// app.use(requireAdmin);
// app.use(requireParticipant);
// app.use(requireJudge);

module.exports = app;



