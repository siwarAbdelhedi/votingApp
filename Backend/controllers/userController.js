const User = require('../models/user');
const SpotifyWebApi = require('spotify-web-api-node');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    redirectUri: process.env.redirectUrl
});
const secretTOKEN = process.env.JWT_SECRET_KEY;

const register = async(req, res) =>{
    try {
        const {email, password, role} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email, password:hashPassword, role});
        const savedUser = newUser.save();

        res.status(200).json(savedUser);
        
    } catch (error) {
        res.status(500).json(error);
        
    }
}

const login = async(req, res) =>{
    try {
        // prendre les ds de login à partir de req
        const {email, password} = req.body;
        // vérification d'un utilisateur avec cette email
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            res.status(400).json({error:'Not existing User or Invalid Email'});
        }
        //vérification de password
        const passwordMatch = bcrypt.compare(password, existingUser.password);
        if (! passwordMatch){
            res.status(401).json({error:'Invalid Password'});
        }
        //Données correct
        const token = jwt.sign({userId: existingUser._id, role: existingUser.role},secretTOKEN, {expiresIn:'1h'});
        res.status(200).json({user: existingUser,
            token: token,});
    } catch (error) {
        res.status(500).json({error:'login failed'});
        
    }
}

const getLogin = async(req, res) => {
    // Define the scopes for authorization; these are the permissions we ask from the user.
    const scopes = ['user-read-email', 'user-read-playback-state', 'user-modify-playback-state'];
    // Redirect the client to Spotify's authorization page with the defined scopes.
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
};

module.exports = {register, login, getLogin};
