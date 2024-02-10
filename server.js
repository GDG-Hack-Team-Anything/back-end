require('dotenv').config();

const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnect = require('./app/config/dbConnect');



const adminRoute = require('./app/routes/adminRoute');
const userRoute = require('./app/routes/userRoute');
const authRoute = require('./app/routes/authRoute');
const eventRoute = require('./app/routes/eventRoute');
const teamRoute = require('./app/routes/teamRoute');
const submissionRoute = require('./app/routes/submissionRoute');
const mentorRoute = require('./app/routes/mentorRoute');
const subthemeRoute = require('./app/routes/subthemeRoute');
const judgementRoute = require('./app/routes/judgementRoute');

const { checkUser, requireAuth } = require('./app/middleware/userMiddleware');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json()); // parse json data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to the database
app.listen(process.env.PORT, async () => {
    console.log(`Server running on port ${process.env.PORT}`);
    await dbConnect();
});

app.use(checkUser);

app.use(adminRoute);
app.use(userRoute);
app.use(authRoute);
app.use(eventRoute);
app.use(teamRoute);
app.use(submissionRoute);
app.use(mentorRoute);
app.use(subthemeRoute);
app.use(judgementRoute)

app.use(requireAuth);

module.exports = app;
