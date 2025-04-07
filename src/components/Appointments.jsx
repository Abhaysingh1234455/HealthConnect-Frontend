import { useState } from 'react';
import axios from 'axios';
import './Appointment.css'; // Link your CSS file here

const doctors = [
  "Dr. Arora - Cardiologist",
  "Dr. Mehta - Orthopedic",
  "Dr. Sharma - Dermatologist",
  "Dr. Verma - Neurologist",
  "Dr. Kapoor - Dentist",
  "Dr. Khanna - Pediatrician"
];

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    doctor: doctors[0]
  });
  const [confirmation, setConfirmation] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, date, time, doctor } = formData;

    try {
      await axios.post("https://health-connect-pfqv.onrender.com/send-confirmation", {
        name,
        email,
        date: `${date} at ${time}`,
        doctor,
      });

      setConfirmation("✅ Appointment booked! Confirmation sent to your email.");
    } catch (err) {
      console.error(err);
      setConfirmation("❌ Failed to send confirmation. Please try again.");
    }
  };

  return (
    <div className="appointment-container">
      <div className="appointment-card">
        <h2 className="appointment-title">Book Appointment</h2>
        <form onSubmit={handleSubmit} className="appointment-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="form"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email (for confirmation)"
            className="form"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            className="form"
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            className="form"
            onChange={handleChange}
            required
          />
          <select
            name="doctor"
            className="form"
            onChange={handleChange}
            value={formData.doctor}
          >
            {doctors.map((doc, idx) => (
              <option key={idx} value={doc}>{doc}</option>
            ))}
          </select>
          <button type="submit" className="submit-button">
            Confirm Appointment
          </button>
          {confirmation && (
            <p className="confirmation-message">{confirmation}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
