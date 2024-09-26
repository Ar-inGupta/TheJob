const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

exports.updateProfile = async (req, res) => {
    upload.single('resume')(req, res, async (err) => {
        if (err) return res.status(400).json({ msg: 'File upload error' });

        const { skills } = req.body;
        const resume = req.file ? req.file.path : '';

        try {
            const user = await User.findById(req.user.id);
            if (!user) return res.status(404).json({ msg: 'User not found' });

            if (resume) user.resume = resume;
            if (skills) user.skills = skills.split(',');

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });
};
