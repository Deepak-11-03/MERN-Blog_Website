const userModel=require('../models/userModel')
const jwt =require ('jsonwebtoken')
const bcrypt =require('bcrypt')



module.exports.register= async(req, res)=>{
    try {
        let data=req.body;
        const {fullname,mobile,email,password}=data
        let existingmail = await userModel.findOne({email:email})
        let existingMobile = await userModel.findOne({mobile:mobile})
        if(existingmail || existingMobile){
            return res.status(409).send({message : 'already exist'})
        }
        let hashPass = await bcrypt.hash(password,10)

        const userDetails ={fullname,mobile,email,password:hashPass}
        await userModel.create(userDetails);
         
        return res.status(201).send({message:'Account registered '})

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}


module.exports.login =async(req, res)=>{
    try {
        let data=req.body;
        const {email,password}=data
        let userEmail = await userModel.findOne({email:email})
        if(! userEmail ){
            return res.status(409).send({message : 'user not found'})
        } 
        const validPassword = await bcrypt.compare(password, userEmail.password);
        if (!validPassword) {
            return res.status(401).send({message: "inValid password" });
        }
    
        const name=userEmail.fullname.split(" ")[0]
        const token =jwt.sign({userId:userEmail._id, email:email},process.env.Secret_key)   
        return res.status(200).send({user:name,token :token})

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

