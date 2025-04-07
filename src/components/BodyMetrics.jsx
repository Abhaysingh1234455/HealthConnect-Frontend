import { useState, useEffect } from "react";
import axios from "axios";
import "./BodyMetrics.css";

export default function BodyMetrics() {
  const [metrics, setMetrics] = useState({});
  const [userId, setUserId] = useState(null);

  // Load userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Fetch metrics from backend
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`https://health-connect-pfqv.onrender.com/get-metrics/${userId}`)
      .then((response) => {
        setMetrics(response.data.metrics || {});
      })
      .catch((error) => {
        console.error("Error fetching metrics:", error);
      });
  }, [userId]);

  // Save updated metrics to backend
  const saveMetricsToBackend = (updatedMetrics) => {
    axios
      .post("https://health-connect-pfqv.onrender.com/save-metrics", {
        userId,
        metrics: updatedMetrics,
      })
      .then(() => {
        console.log("Metrics saved successfully.");
      })
      .catch((error) => {
        console.error("Error saving metrics:", error);
      });
  };

  // Add a new metric
  const handleAddMetric = () => {
    const newMetric = prompt(
      "Enter new metric in the format: Metric Name: Value"
    );

    if (newMetric) {
      const parts = newMetric.split(":");
      if (parts.length < 2) {
        alert("Invalid format. Use: Metric Name: Value");
        return;
      }

      const metricName = parts[0].trim();
      const metricValue = parts[1].trim();

      if (!metricName || !metricValue) {
        alert("Metric name and value cannot be empty.");
        return;
      }

      const updatedMetrics = { ...metrics, [metricName]: metricValue };
      setMetrics(updatedMetrics);
      saveMetricsToBackend(updatedMetrics);
    }
  };

  // Edit existing metric
  const handleEditMetric = (oldKey) => {
    const currentVal = metrics[oldKey];
    const updated = prompt(
      "Edit metric in the format: Metric Name: Value",
      `${oldKey}: ${currentVal}`
    );

    if (updated) {
      const parts = updated.split(":");
      if (parts.length < 2) {
        alert("Invalid format. Use: Metric Name: Value");
        return;
      }

      const newKey = parts[0].trim();
      const newVal = parts[1].trim();

      if (!newKey || !newVal) {
        alert("Metric name and value cannot be empty.");
        return;
      }

      const updatedMetrics = { ...metrics };
      delete updatedMetrics[oldKey]; // remove old key
      updatedMetrics[newKey] = newVal;

      setMetrics(updatedMetrics);
      saveMetricsToBackend(updatedMetrics);
    }
  };

  // Delete a metric
  const handleDeleteMetric = (key) => {
    if (window.confirm(`Are you sure you want to delete "${key}"?`)) {
      const updatedMetrics = { ...metrics };
      delete updatedMetrics[key];
      setMetrics(updatedMetrics);
      saveMetricsToBackend(updatedMetrics);
    }
  };

  return (
    <div className="metrics-container" id="metrics">
      <div className="metrics-header">
        <h2>Body Metrics</h2>
        <button className="add-metric-btn" onClick={handleAddMetric}>
          +
        </button>
      </div>

      <div className="metrics-grid">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="metric-card">
            <h3>{key}</h3>
            <p>{value}</p>
            <div className="metric-actions">
              <button onClick={() => handleEditMetric(key)}>✏️</button>
              <button onClick={() => handleDeleteMetric(key)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
