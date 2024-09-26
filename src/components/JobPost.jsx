import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function JobPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/jobs', { title, description, company, location, skills }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Job Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="text" placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} required />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default JobPost;
