import User from "../models/user.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
            role: user.role
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }

}

export const registerUserController = async (req, res) => {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });


    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }


    const user = await User.create({
        email,
        password,
        ...(role && { role })
    });



    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
}
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const getUserByIdController = async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}

export const updateUserByIdController = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role =req.body.role || user.role
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const deleteUserByIdController =async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        if (user._id == req.user.id) {
            return res.status(400).json({ message: 'User Cannot delete himself' });
        }
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
 
      } catch (error) {
        console.log(error);
    
        res.status(500).json({ message: 'Server error', error });
      }
}

export const getUsersController =async(req,res)=>{
    const { page = 1, limit = 10, search = '' } = req.query;

    const nameFilter = search ? { name: { $regex: search, $options: 'i' } } : {};
  
    try {
      const totalUsers = await User.countDocuments(nameFilter);
  
      const users = await User.find(nameFilter)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      res.json({
        totalUsers,
        currentPage: parseInt(page),
        totalUsers: Math.ceil(totalUsers / limit),
        users,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve users', error });
    }
}