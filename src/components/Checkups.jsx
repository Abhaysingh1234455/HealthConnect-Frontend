import  { useState } from "react";
import "./Checkups.css";

const Reminder = () => {
  const [checkups, setCheckups] = useState([
    { id: 1, doctor: "Dr. Jain", date: "2025-02-20", time: "10:30 AM", completed: false },
    { id: 2, doctor: "Dr. Arora", date: "2025-02-22", time: "2:00 PM", completed: false },
    { id: 3, doctor: "Dr. Mehta", date: "2025-02-25", time: "9:15 AM", completed: false },
  ]);

  const [newCheckup, setNewCheckup] = useState({
    doctor: "",
    date: "",
    time: "",
  });

  // Mark checkup as completed
  const markCompleted = (id) => {
    const updatedCheckups = checkups.map((checkup) =>
      checkup.id === id ? { ...checkup, completed: true } : checkup
    );
    setCheckups(updatedCheckups);
  };

  // Delete a checkup
  const deleteCheckup = (id) => {
    setCheckups(checkups.filter((checkup) => checkup.id !== id));
  };

  // Add a new checkup
  const addCheckup = () => {
    if (newCheckup.doctor && newCheckup.date && newCheckup.time) {
      const newEntry = {
        id: checkups.length + 1,
        doctor: newCheckup.doctor,
        date: newCheckup.date,
        time: newCheckup.time,
        completed: false,
      };
      setCheckups([...checkups, newEntry]);
      setNewCheckup({ doctor: "", date: "", time: "" });
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="reminder-container">
      <h2>Upcoming Checkups</h2>
      <ul>
        {checkups.map((checkup) => (
          <li key={checkup.id} className={checkup.completed ? "completed" : ""}>
            <strong>{checkup.doctor}</strong> - {checkup.date} at {checkup.time}
            <div>
              {!checkup.completed && (
                <button className="done" onClick={() => markCompleted(checkup.id)}>✅ Done</button>
              )}
              <button onClick={() => deleteCheckup(checkup.id)}>🗑️ Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Add New Checkup</h3>
      <input className="form"
        type="text"
        placeholder="Doctor's Name"
        value={newCheckup.doctor}
        onChange={(e) => setNewCheckup({ ...newCheckup, doctor: e.target.value })}
      />
      <input
       className="form"
        type="date"
        value={newCheckup.date}
        onChange={(e) => setNewCheckup({ ...newCheckup, date: e.target.value })}
      />
      <input 
        className="form"
        type="time"
        value={newCheckup.time}
        onChange={(e) => setNewCheckup({ ...newCheckup, time: e.target.value })}
      />
      <button className="form" onClick={addCheckup}>➕ Add Checkup</button>
    </div>
  );
};

export default Reminder;
