import express from 'express'
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'

const UserRouter = express.Router();

//register
UserRouter.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        userauth: req.body.userauth,
        password: bcrypt.hashSync(req.body.password)
    });
    const user = await newUser.save();
    res.send({
        _id: user._id,
        username: user.username, 
        userauth: user.userauth,

    });
});

// login
UserRouter.post('/login',  async (req, res) => {
    const user = await User.findOne({
        userauth: req.body.userauth
    })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                username: user.username, 
                userauth: user.userauth,
        
            });
        }
    }
})

export default UserRouter;
