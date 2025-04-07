import  { useState } from "react";
import "./ac.css";

const Activities = () => {
  const [activities, setActivities] = useState([
    { id: 1, task: "Scheduled appointment Dr. Arora", completed: false },
    { id: 2, task: "Uploaded medical records", completed: false },
    { id: 3, task: "Checked lab test results", completed: true },
  ]);

  const [newTask, setNewTask] = useState("");

  // Add a new activity
  const addActivity = () => {
    if (newTask.trim() !== "") {
      const newEntry = {
        id: activities.length + 1,
        task: newTask,
        completed: false,
      };
      setActivities([...activities, newEntry]);
      setNewTask(""); // Clear input
    } else {
      alert("Please enter an activity!");
    }
  };

  // Mark activity as completed
  const markCompleted = (id) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === id ? { ...activity, completed: !activity.completed } : activity
    );
    setActivities(updatedActivities);
  };

  // Delete activity
  const deleteActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  return (
    <div className="activities-container">
      <h2>Recent Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} className={activity.completed ? "completed" : ""}>
            <span>{activity.task}</span>
            <div>
              <button onClick={() => markCompleted(activity.id)}>
                {activity.completed ? "🔄 Undo" : "✅ Done"}
              </button>
              <button className="btn-2" onClick={() => deleteActivity(activity.id)}>🗑️ Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="add-activity">
        <input
          type="text"
          placeholder="Add new activity..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addActivity}>➕ Add</button>
      </div>
    </div>
  );
};

export default Activities;
