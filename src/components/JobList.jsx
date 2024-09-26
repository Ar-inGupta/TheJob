import React from 'react';
import { Link } from 'react-router-dom';

const JobList = ({ jobs }) => {
    return (
        <div>
            {jobs.map((job) => (
                <div key={job._id}>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <Link to={`/jobs/${job._id}`}>View Details</Link>
                </div>
            ))}
        </div>
    );
};

export default JobList;
