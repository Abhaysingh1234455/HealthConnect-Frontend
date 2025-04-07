import { useState, useRef } from "react";
import "./Report.css";

const Report = () => {
  const [reports, setReports] = useState([]);
  const fileInputRef = useRef(null); // Reference to the hidden input

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newReports = files.map((file) => ({
      id: Date.now() + Math.random(), // Unique ID
      name: file.name,
      url: URL.createObjectURL(file), // Create a temporary URL for preview
      type: file.type.includes("image") ? "image" : "file",
    }));

    setReports([...reports, ...newReports]);
  };

  // Delete file
  const handleDelete = (id) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  // Trigger file input
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="report-container">
      <h2>Upload & View Reports</h2>

      <input
        type="file"
        multiple
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button className="upload-btn" onClick={handleUploadClick}>
        📤 Upload Files
      </button>

      <div className="reports-list">
        {reports.map((report) => (
          <div key={report.id} className="report-card">
            {report.type === "image" ? (
              <img src={report.url} alt={report.name} className="report-img" />
            ) : (
              <p className="report-name">{report.name}</p>
            )}
            <div className="report-actions">
              <a
                href={report.url}
                download={report.name}
                className="download-btn"
              >
                📥 Download
              </a>
              <button
                onClick={() => handleDelete(report.id)}
                className="delete-btn"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;
