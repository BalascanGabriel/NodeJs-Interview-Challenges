//get the user model
const User = require('../models/user')

exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error' })
    }
}