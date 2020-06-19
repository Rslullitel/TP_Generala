// const connection = require("./connection");
const UserLooby = require('../model/UserLobby');

async function getUsersLobby(){
    const collection= await UserLooby.find();
    return collection;
}

async function getUserLobby(userId){
    console.log("getUserLobby",userId)
    const user= await UserLooby.findOne({userId: userId});
    return user;
}

//alo 

async function pushUserLobby(usernama,userId){

    console.log(`pushUser ${name}`);
    //Check if the sala exists
    // const nameExist= await Sala.findOne({name: name});
    // if(nameExist) return err='Sala already exists';
    const user = new UserLooby ({
    userId: userId,
    usernama: usernama
    });
    try{            
        const saveUserLobby=await user.save();
        return saveUserLobby;
        }
    catch(err){
        return err;
    }
    
    
}



async function deleteUserLobby(userId){
    console.log("deleteUserLobby" ,userId)
    const result= await UserLooby.deleteOne({userId: userId});
    return result;

}
async function deleteAllUserLobby(){
    console.log("deleteAllUserLobby" )
    const result= await UserLooby.deleteMany({});
    return result;

}

module.exports = {getUsersLobby, getUserLobby, pushUserLobby, deleteUserLobby,deleteAllUserLobby };