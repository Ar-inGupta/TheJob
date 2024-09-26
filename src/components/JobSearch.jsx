import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get('/api/jobs', { params: { location, skills } });
        setJobs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, [location, skills]);

  return (
    <div>
      <h2>Job Search</h2>
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="text" placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
      <div>
        {jobs.map((job) => (
          <div key={job._id}>
            <Link to={`/job/${job._id}`}>
              <h3>{job.title}</h3>
              <p>{job.company} - {job.location}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobSearch;
