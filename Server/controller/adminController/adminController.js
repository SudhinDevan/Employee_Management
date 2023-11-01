import userModel from "../../model/users/userModel.js";
export const home = async (req,res) => {
    try {
        const adminDetails = await  userModel.find({isAdmin:false}).sort({createdAt:-1})
        res.status(200).json(adminDetails);
    } catch (error) {
        res.json(error)
    }
}

export const deleteUser = async (req,res) => {
    try {
        await userModel.deleteOne({_id:req.query.id})
        res.json({success:true})
    } catch (error) {
        console.log(error)
    }
}

export const delUser = async(req,res)=>{
  try{
    const username = await userModel.findOne({_id: id})
    username.username = '';
    req.json({success: true})
  }catch(error){
    console.log(error)
  }
}

export const editAccess = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await userModel.findById(id); 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();
    const userData = await userModel.find({isAdmin:'false'})
    res.json({ userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const editProfile = async(req,res) => {
  try {
    const {id} = req.query
    const userData = await userModel.findById(id)
    if(userData){
      res.json({success:true,userData})
    }else{
      res.json({success:true,userData})
    }
  } catch (error) {
    res.json({success:false})
  }
}
export const updateprofile = async (req, res) => {
  try {
    const { id } = req.query;
    const profileDetails = req.body;

    // Retrieve the user by ID
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update user data based on profileDetails
    if (profileDetails.username) {
      user.username = profileDetails.username;
    }

    // Handle image update (assuming you're using multer for file uploads)
    if (req.file) {
      const imageFile =  req.file.filename
      console.log(req.file);
      if (!imageFile) {
        return res.status(400).json({ success: false, message: 'Invalid image file' });
      }

      user.image = imageFile;
    }

    // Save the updated user data
    await user.save();

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

