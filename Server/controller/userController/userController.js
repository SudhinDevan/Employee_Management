import userModel from "../../model/users/userModel.js";
import bcrypt from 'bcrypt'
import {generateToken} from '../../middleware/auth.js'

export const handleSignUp = async (req, res) => {
    try {
        const userdetails  = req.body;
        console.log("user here",userdetails);
        const user = await userModel.find({email:userdetails.email})

        if(user.length===0){
            const passBcrypt = await bcrypt.hash(userdetails.password,10);
            const newuser = new userModel({
                username:userdetails.username,
                password:passBcrypt,
                email:userdetails.email,
            });
            await newuser.save()
            res.json({status:true,result:{newuser}})
        }else{
            res.json({error:'Email Already Exists'})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.error(error);
        res.json({error:'Email Already Exists'})
    }
}

export const handleLogin = async (req,res) => {
    try {
        const logindetails = req.body;
        const user = await userModel.findOne({email:logindetails.email});

        if(user){

            if(!user.isActive){
                res.json({status:false, error: 'Access Denied' })
            }

            const matchPass = await bcrypt.compare(logindetails.password,user.password)
            if(matchPass){

                let token = generateToken(user)
                res.json({status:true,user:token,username:user.username,isAdmin:user.isAdmin})

            }else{

                res.json({ status: false, error: 'Password Didnt Match' })

            }

        }else{
            res.json({ status: false, error: 'Email is not Registered' })

        }

    } catch (error) {

        console.error();

    }
}

export const home = async(req,res)=>{

    const userdata = await userModel.findOne({email:req.user.email})
    res.json({success:true,userData:userdata})

}

export const profile = async(req,res)=>{

    const userdata = req.user.email

    try{

        const getdetails = await userModel.findOne({email:userdata})
        res.json({userData:getdetails,success:true})

    }
    catch(err){

        console.log(err)

    }
}

export const editprofile = async (req,res)=>{

    try{
        const editprofile = await userModel.findOne({email:req.user.email})
        if(editprofile){
            
            res.json({userdata:editprofile,success:true})

          }else{
            res.json({success:false,message:'Profile Details Failed to Fetch'})
          }
    }
    catch(err){
        console.log(err)
    }

}

export const updateprofile = async(req,res)=>{

    try{
        console.log('updateprofile')
        console.log(req.body);
        const profileDetails = req.body
        const email = req.user.email
       

        const user = await userModel.findOne({email:email})

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
          }
      
         
          if (profileDetails.username) {
            user.username = profileDetails.username;
          }
      
         
          if (req.file) {
            const imageFile =  req.file.filename
            console.log(req.file);
            if (!imageFile) {
              return res.status(400).json({ success: false, message: 'Invalid image file' });
            }
      
            user.image = imageFile;
          }
      
         
          await user.save();
      
          res.json({ success: true, message: 'Profile updated successfully' });
        
    }
    catch(err){

        console.log(err.message)
        res.json({success:true,message:'Something went wrong'})

    }
}