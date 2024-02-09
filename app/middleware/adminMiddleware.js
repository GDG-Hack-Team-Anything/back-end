const User = require('../models/User');

const requireAdmin = (req, res, next) => {
    // This middleware expects the "checkUser" middleware to be executed before it
    
    // Access user attributes
    const { role } = res.locals.user;

    if (role !== 'admin') {
        // If the user's role is not 'admin', redirect to the login page
        res.status(303).redirect('/users/user/login'); // Customize the URL as needed
    } else {
        // If the user's role is 'admin', allow them to proceed
        next();
    }
}

  const requireJudge = (req, res, next) => {
    //this middleware expects the "user middleware" to be already executed
    
    if(res.locals.user.role !== 'judge'){

        res.status(303).redirect('/user/login');
        res.status(403).json({message: "judge permission required"});
        
    }else{
        next();
    }
  }

  const requireParticipant = (req, res, next) => {
    //this middleware expects the "user middleware" to be already executed
    
    if(res.locals.user.role !== 'admin' || res.locals.user.role !== 'participant'){

        res.status(303).redirect('/user/login');
        res.status(403).json({message: "participant permission required"});
        
    }else{
        next();
    }
  }
  
  module.exports = {requireAdmin, requireJudge, requireParticipant};


