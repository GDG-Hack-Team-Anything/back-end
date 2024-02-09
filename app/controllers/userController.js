const User = require('../models/User') ;


//get all users of the platform
module.exports.getAllUsers = async (req, res) =>{
    try{
        const users = await User.find().populate('position').populate('zone');
        res.status(200).send(users);
    }catch(err){
        console.log("fetch failed");
        res.status(500).json({message: err.message});
    }
}

//get users of a specific event
module.exports.getEventUsers = async (req, res) =>{
    _id = req.params.id;
    try{
        const users = await User.find({ event: _id }).populate('firstName').populate('lastName').populate('role');
        res.status(200).send(users);
    }catch(err){
        console.log("fetch failed");
        res.status(500).json({message: err.message});
    }
}

module.exports.getAdmins = async (req, res) =>{
    try{
        const admins = await User.find({ role: 'admin' });
        res.status(200).send(admins);
    }catch(err){
        console.log("fetch failed");
        res.status(500).json({message: err.message});
    }
}

module.exports.getParticipants = async (req, res) =>{
    try{
        const participants = await User.find({ role: 'participant' });
        res.status(200).send(participants);
    }catch(err){
        console.log("fetch failed");
        res.status(500).json({message: err.message});
    }
}

module.exports.getJudges = async (req, res) =>{
    try{
        const judges = await User.find({ role: 'judge' });
        res.status(200).send(judges);
    }catch(err){
        console.log("fetch failed");
        res.status(500).json({message: err.message});
    }
}

module.exports.getCompanies = async (req, res) =>{
    try{
        const companies = await User.find({ role: 'company' });
        res.status(200).send(companies);
    }catch(err){
        console.log("fetch failed");
        res.status(500).json({message: err.message});
    }
}

module.exports.createAdmin = async (req, res) =>{
    try{
        //creat a new user
        const user = await User.create({ ...req.body, role: 'admin' });
        res.status(200).json(user);
        console.log("user created sucessfully");

    }catch(err){

        console.log("Creation failed");
        res.status(500).json({message: err.message});
    }

}

module.exports.createJudge = async (req, res) =>{
    try{
        //creat a new user
        const user = await User.create({ ...req.body, role: 'judge' });
        res.status(200).json(user);
        console.log("user created sucessfully");

    }catch(err){

        console.log("Creation failed");
        res.status(500).json({message: err.message});
    }

}

module.exports.createParticipant = async (req, res) =>{
    try{
        //creat a new user
        const user = await User.create({ ...req.body, role: 'participant' });
        res.status(200).json(user);
        console.log("user created sucessfully");

    }catch(err){

        console.log("Creation failed");
        res.status(500).json({message: err.message});
    }

}

module.exports.createCompany = async (req, res) =>{
    try{
        //creat a new user
        const user = await User.create({ ...req.body, role: 'company' });
        res.status(200).json(user);
        console.log("user created sucessfully");

    }catch(err){

        console.log("Creation failed");
        res.status(500).json({message: err.message});
    }

}



module.exports.getUser = async (req, res) =>{
    _id = req.params.id;
    try{

      const user = await User.findById(_id).populate('firstName').populate('lastName').populate('role');
      if(user){

            res.status(200).send(user);
        
        }else{
            res.status(404).json({message: "User not found"});
        }
        
    }catch(err){
        console.log("fetch failed");
        res.status(500).json({message: err.message});
    }
}



module.exports.createUser = async (req, res) =>{
    try{
        //creat a new user
        const user = await User.create({ ...req.body });
        res.status(200).json(user);
        console.log("user created sucessfully");

    }catch(err){

        console.log("Creation failed");
        res.status(500).json({message: err.message});
    }

}


module.exports.updateUser = async (req, res) =>{
    _id = req.params.id;
    try{
        const user=await User.findOneAndUpdate({_id}, req.body, {new: true});
        if(user){    
            res.status(200).json(user);
            console.log("User updated sucessfully");
        }else{
            res.status(404).json({message: "User not found"});
            console.log("User not found");
        }

    }catch(err){
        console.log("User update failed");
        res.status(500).json({message: err.message});
    }
}

module.exports.deleteUser = async (req, res) =>{
    _id = req.params.id;
    try{
        const user=await User.findOneAndDelete({_id});
        if(user){
            res.status(200).json(user);
            console.log("User deleted sucessfully");
        }else{
            res.status(401).json({message: "User not found"});
            console.log("User not found");
        }

    }catch(err){
        console.log("Delete failed");
        res.status(500).json({message: err.message});
    }

}
