const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['job-seeker', 'employer'], default: 'job-seeker' },
    resume: { type: String }, // Path to resume file
    skills: [{ type: String }] // List of skills
});

module.exports = mongoose.model('User', UserSchema);
