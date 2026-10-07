import React from 'react';

export default function CompanyStatus({ metrics = {} }) {
  return (
    <div>
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="label">Server Status</div>
          <div className="value status-online">{metrics.serverStatus || "Active"}</div>
        </div>
        <div className="metric-card">
          <div className="label">Active Nodes</div>
          <div className="value status-neutral">{metrics.activeNodes || "0 / 0"}</div>
        </div>
        <div className="metric-card">
          <div className="label">Efficiency Rating</div>
          <div className="value status-info">{metrics.efficiency || "100%"}</div>
        </div>
      </div>
      
      <div className="notice-box">
        <h4>Platform Logs / Notices</h4>
        <p>{metrics.systemNotice || "All tracking metrics functioning normally within designated structural parameters."}</p>
      </div>
    </div>
  );
}