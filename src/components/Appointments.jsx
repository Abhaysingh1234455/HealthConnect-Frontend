// import { useState, useEffect } from "react";
// import axios from "axios";
// import PropTypes from "prop-types";
// import "./Appointment.css";

// const Appointments = ({ hospitals: propHospitals = [] }) => {
//   const [hospitals, setHospitals] = useState(propHospitals);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     date: "",
//     time: "",
//     hospital: propHospitals[0]?.name || "",
//   });
//   const [confirmation, setConfirmation] = useState("");
//   const [loadingHospitals, setLoadingHospitals] = useState(propHospitals.length === 0);

//   // Fetch hospitals only if not passed as props
//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const coords = await new Promise((resolve, reject) =>
//           navigator.geolocation.getCurrentPosition(
//             (pos) => resolve(pos.coords),
//             reject
//           )
//         );

//         const res = await fetch(
//           `https://health-connect-pfqv.onrender.com/api/nearby-hospitals?lat=${coords.latitude}&lng=${coords.longitude}`
//         );
//         const data = await res.json();

//         if (data.status === "OK") {
//           const nearby = data.results.slice(0, 6);
//           setHospitals(nearby);
//           setFormData((prev) => ({
//             ...prev,
//             hospital: nearby[0]?.name || "",
//           }));
//         }
//       } catch (err) {
//         console.error("Failed to fetch hospitals:", err);
//       } finally {
//         setLoadingHospitals(false);
//       }
//     };

//     if (propHospitals.length === 0) {
//       fetchHospitals();
//     }
//   }, [propHospitals]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, date, time, hospital } = formData;

//     try {
//       await axios.post("https://health-connect-pfqv.onrender.com/send-confirmation", {
//         name,
//         email,
//         date: `${date} at ${time}`,
//         doctor: hospital, // assuming API expects `doctor` field
//       });

//       setConfirmation(
//         "✅ Appointment booked! Confirmation sent to your email."
//       );
//     } catch (err) {
//       console.error(err);
//       setConfirmation("❌ Failed to send confirmation. Please try again.");
//     }
//   };

//   return (
//     <div className="appointment-container">
//       <div className="appointment-card">
//         <h2 className="appointment-title">Book Appointment</h2>
//         <form onSubmit={handleSubmit} className="appointment-form">
//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             className="form"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Your Email (for confirmation)"
//             className="form"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="date"
//             name="date"
//             className="form"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="time"
//             name="time"
//             className="form"
//             onChange={handleChange}
//             required
//           />

//           {loadingHospitals ? (
//             <p>Loading nearby hospitals...</p>
//           ) : (
//             <select
//               name="hospital"
//               className="form"
//               onChange={handleChange}
//               value={formData.hospital}
//               required
//             >
//               {hospitals.map((h, idx) => (
//                 <option key={idx} value={h.name}>
//                   {h.name}
//                 </option>
//               ))}
//             </select>
//           )}

//           <button type="submit" className="submit-button">
//             Confirm Appointment
//           </button>
//           {confirmation && (
//             <p className="confirmation-message">{confirmation}</p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// Appointments.propTypes = {
//   hospitals: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       rating: PropTypes.number,
//       vicinity: PropTypes.string,
//       geometry: PropTypes.shape({
//         location: PropTypes.shape({
//           lat: PropTypes.number,
//           lng: PropTypes.number,
//         }),
//       }),
//     })
//   ),
// };

// export default Appointments;
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./Appointment.css";

const Appointments = ({ hospitals: propHospitals = [] }) => {
  const [hospitals, setHospitals] = useState(propHospitals);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    hospital: propHospitals[0]?.name || "",
  });
  const [confirmation, setConfirmation] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(
    propHospitals.length === 0
  );

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const coords = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            reject
          )
        );

        const res = await fetch(
          `https://health-connect-pfqv.onrender.com/api/nearby-hospitals?lat=${coords.latitude}&lng=${coords.longitude}`
        );
        const data = await res.json();

        if (data.status === "OK") {
          const nearby = data.results.slice(0, 6);
          setHospitals(nearby);
          setFormData((prev) => ({
            ...prev,
            hospital: nearby[0]?.name || "",
          }));
        }
      } catch (err) {
        console.error("Failed to fetch hospitals:", err);
      } finally {
        setLoadingHospitals(false);
      }
    };

    if (propHospitals.length === 0) {
      fetchHospitals();
    }

    fetchAppointments();
  }, [propHospitals]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "https://health-connect-pfqv.onrender.com/appointments"
      );
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, date, time, hospital } = formData;
    const appointment = {
      name,
      email,
      date,
      time,
      hospital,
    };

    try {
      await axios.post(
        "https://health-connect-pfqv.onrender.com/send-confirmation",
        {
          ...appointment,
          doctor: hospital, // assuming API expects `doctor`
        }
      );

      await axios.post(
        "https://health-connect-pfqv.onrender.com/appointments",
        appointment
      );

      setConfirmation(
        "✅ Appointment booked! Confirmation sent to your email."
      );
      setAppointments((prev) => [...prev, appointment]);
    } catch (err) {
      console.error(err);
      setConfirmation("❌ Failed to book appointment.");
    }
  };

  const cancelAppointment = async (index, email) => {
    const appointmentToCancel = appointments[index];
    try {
      await axios.post(
        "https://health-connect-pfqv.onrender.com/cancel-appointment",
        {
          ...appointmentToCancel,
          email,
        }
      );

      const updated = appointments.filter((_, i) => i !== index);
      setAppointments(updated);
      setConfirmation("❌ Appointment cancelled. Email confirmation sent.");
    } catch (err) {
      console.error("Cancellation failed:", err);
      setConfirmation("❌ Failed to cancel appointment.");
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

          {loadingHospitals ? (
            <p>Loading nearby hospitals...</p>
          ) : (
            <select
              name="hospital"
              className="form"
              onChange={handleChange}
              value={formData.hospital}
              required
            >
              {hospitals.map((h, idx) => (
                <option key={idx} value={h.name}>
                  {h.name}
                </option>
              ))}
            </select>
          )}

          <button type="submit" className="submit-button">
            Confirm Appointment
          </button>
          {confirmation && (
            <p className="confirmation-message">{confirmation}</p>
          )}
        </form>
      </div>

      {/* 👇 Scheduled Appointments List */}
      {appointments.length > 0 && (
        <div className="appointment-list">
          <h3>📅 Scheduled Appointments</h3>
          {appointments.map((appt, index) => (
            <div key={index} className="appointment-item">
              <p>
                <strong>{appt.name}</strong> | {appt.date} at {appt.time} | 🏥{" "}
                {appt.hospital}
              </p>
              <button
                className="cancel-button"
                onClick={() => cancelAppointment(index, appt.email)}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Appointments.propTypes = {
  hospitals: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rating: PropTypes.number,
      vicinity: PropTypes.string,
      geometry: PropTypes.shape({
        location: PropTypes.shape({
          lat: PropTypes.number,
          lng: PropTypes.number,
        }),
      }),
    })
  ),
};

export default Appointments;
