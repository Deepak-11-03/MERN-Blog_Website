const userModel=require('../models/userModel')
const jwt =require ('jsonwebtoken')
const bcrypt =require('bcrypt')
const crypto =require('node:crypto')
const nodemailer =require('nodemailer')



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

        const userDetails ={fullname,mobile,email,password:hashPass,emailToken:(crypto.randomBytes(20).toString('hex'))}
        const user= await userModel.create(userDetails);

         let mailsent= async function(){
            try {
                const transporter=nodemailer.createTransport({
                    host:process.env.HOST,
                    service:'gmail',
                    port:587,
                    auth:{
                        user:process.env.USER,
                        pass:process.env.PASS
                    }
                })
        
            await transporter.sendMail({
                    from:"'Verify Your email' <process.env.USER>",
                    to:email,
                    subject:'Verify your email',
                    html:`<h2>Hlo ,${fullname}! Thanks for registering on our site </h2>
                            <h4>Please verify your email to continue </h4>
                             <a href="http://${req.headers.host}/verify?token=${user.emailToken}">Verify your email</a> `,
                })
           console.log('send')
            } catch (error) {
                return res.status(500).send(error)
            }
        }
        mailsent();
         
        return res.status(201).send({message:'Account registered , Check your mail'})

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
    
        if(userEmail.verified === false){
            return res.status(400).send({message:"Please verify your email"})
        }
        const name=userEmail.fullname.split(" ")[0]
        const token =jwt.sign({userId:userEmail._id, email:email},process.env.Secret_key)   
        return res.status(200).send({user:name,token :token})

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports.verify= async(req,res)=>{
    try {
        const token=req.query.token
        const user=await userModel.findOne({emailToken:token})
        if(user){
            user.emailToken=null;
            user.verified=true;
            await user.save()
            return res.send("Verified")
        }
        else{
            return res.status(400).send({message:"You are already verified"})
        }
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}