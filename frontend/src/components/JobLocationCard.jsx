import React from 'react';

export default function JobLocationCard() {
  // Mock job location data - replace with actual data
  const jobLocation = "New York, NY";

  return (
    <div className="card">
      <h3>Job Location</h3>
      <p>{jobLocation}</p>
    </div>
  );
}
