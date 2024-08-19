import React, { useState, useEffect } from 'react';
import Nav from "../components/Nav";
import '../css/styles.css';

const Report = ({ Toggle }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // State for selected job

  useEffect(() => {
    fetch('http://localhost:4000/getjobs')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleRowClick = (job) => {
    setSelectedJob(job); // Set selected job
  };

  const closeDrawer = () => {
    setSelectedJob(null); // Close drawer by setting selectedJob to null
  };

  return (
    <div className={`report ${selectedJob ? 'drawer-open' : ''}`}>
      <Nav Toggle={Toggle} />

      <div className="header-container">
        <h1>Jenkins Summary Report</h1>

        <div className="search-bar">
          <input type="text" placeholder="Enter Package Name" />
          <button className="button">Search</button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Package Name</th>
              <th>Version</th>
              <th>Published Version</th>
              <th>Distro</th>
              <th>Status</th>
              <th>Job URL</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job._id} onClick={() => handleRowClick(job)}>
                <td>{index + 1}</td>
                <td>{job.packageName}</td>
                <td>{job.version}</td>
                <td>{job.publishedVersion}</td>
                <td>{job.distro}</td>
                <td>{job.status}</td>
                <td><a href={job.jobDetails.jobUrl} target="_blank" rel="noopener noreferrer">View Job</a></td>
                <td>{job.jobDetails.duration.toFixed(2)} seconds</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Drawer for Job Details */}
      <div className={`drawer ${selectedJob ? 'open' : ''}`}>
        {selectedJob && (
          <div className="drawer-content">
            <button className="close-btn" onClick={closeDrawer}>Close</button>
            <h2>{selectedJob.packageName}</h2>
            <p><strong>Version:</strong> {selectedJob.version}</p>
            <p><strong>Published Version:</strong> {selectedJob.publishedVersion}</p>
            <p><strong>Distro:</strong> {selectedJob.distro}</p>
            <p><strong>Status:</strong> {selectedJob.status}</p>
            <p><strong>Job URL:</strong> <a href={selectedJob.jobDetails.jobUrl} target="_blank" rel="noopener noreferrer">View Job</a></p>
            <p><strong>Duration:</strong> {selectedJob.jobDetails.duration.toFixed(2)} seconds</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
