// import React from 'react';
import './Health.css';
import Checkups from './Checkups';
import Activities from './Activities'

export default function Health() {
  return (
    <div className="health-container">
      <h2>Health Overview</h2>
      <div className="health-grid">
        <div className="health-card">
         
          <Activities/>
        </div>
        <div className="health-card">
          <Checkups/>
        </div>
      </div>
    </div>
  );
}
