import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [resume, setResume] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`/api/jobs/${id}`);
        setJob(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/jobs/${id}/apply`, { resume, reason }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Application submitted!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <h3>Apply for this job</h3>
      <form onSubmit={handleApply}>
        <input type="text" placeholder="Resume URL" value={resume} onChange={(e) => setResume(e.target.value)} required />
        <textarea placeholder="Why do you want to join this company?" value={reason} onChange={(e) => setReason(e.target.value)} required />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default JobDetails;
