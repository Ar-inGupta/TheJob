import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const JobApplications = ({ jobId }) => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const { data } = await api.get(`/jobs/${jobId}/applications`);
                setApplications(data);
            } catch (error) {
                console.error(error);
                alert('Error fetching applications');
            }
        };

        fetchApplications();
    }, [jobId]);

    return (
        <div>
            {applications.map((application) => (
                <div key={application._id}>
                    <h4>{application.user.name}</h4>
                    <p>Email: {application.user.email}</p>
                    <p>Resume: <a href={`/${application.resume}`} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                    <p>Reason: {application.reason}</p>
                </div>
            ))}
        </div>
    );
};

export default JobApplications;
