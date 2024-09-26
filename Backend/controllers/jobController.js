const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');

// Post a new job (employer only)
exports.postJob = async (req, res) => {
    const { title, description, skillsRequired, location, company } = req.body;

    try {
        const job = new Job({ title, description, skillsRequired, location, company, employer: req.user.id });
        await job.save();
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Search and filter jobs (public)
exports.searchJobs = async (req, res) => {
    const { skills, location, company } = req.query;

    try {
        const query = {};
        if (skills) query.skillsRequired = { $in: skills.split(',') };
        if (location) query.location = location;
        if (company) query.company = company;

        const jobs = await Job.find(query);
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Apply for a job (job-seeker only)
exports.applyForJob = async (req, res) => {
    const { jobId, reason } = req.body;

    try {
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ msg: 'Job not found' });

        const application = new Application({
            job: jobId,
            user: req.user.id,
            resume: req.user.resume,
            reason
        });

        await application.save();
        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
// Skill-based matching
exports.matchJobs = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const jobs = await Job.find({});
        const matchedJobs = jobs.filter(job => {
            const skillsRequired = new Set(job.skillsRequired);
            const userSkills = new Set(user.skills);
            const intersection = [...skillsRequired].filter(skill => userSkills.has(skill)).length;
            const matchPercentage = (intersection / skillsRequired.size) * 100;
            return matchPercentage >= 60;
        });

        res.json(matchedJobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getJobs = async(req,res)=>{
    try {
        const jobs = await Job.find({});
        res.json(Jobs);
    } catch (error) {
        res.error(500).send("Server error");
    }
};

