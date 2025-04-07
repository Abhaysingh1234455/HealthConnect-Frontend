// /* eslint-disable react/no-unescaped-entities */
// import PropTypes from 'prop-types';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import "./login.css";

// function Login({ setIsAuthenticated }) {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const response = await axios.post('https://health-connect-pfqv.onrender.com/login', { Email: email, Password: password });

//       console.log("Full Login Response:", response.data);

//       if (response.data.message === "success") {
//         localStorage.setItem("isAuthenticated", "true");
//         localStorage.setItem("userId", response.data.userId); // important for metrics
//         setIsAuthenticated(true);
//         navigate('/home');
//       } else {
//         setError(response.data.message); // Show error message
//       }
//     } catch (error) {
//       setError("Incorrect credentials, please check again");
//       console.error("Login Error:", error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow-lg p-4">
//             <h2 className="text-center mb-4">Login</h2>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">Email address:</label>
//                 <input
//                   type="email"
//                   className="form"
//                   id="email"
//                   placeholder="Enter your email"
//                   required
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label">Password:</label>
//                 <input
//                   type="password"
//                   className="form"
//                   id="password"
//                   placeholder="Enter your password"
//                   required
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary w-100">Login</button>
//             </form>
//             <p className="text-center mt-3">
//               Don't have an account? <a href="/SignupPage">Sign Up</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// Login.propTypes = {
//   setIsAuthenticated: PropTypes.func.isRequired,
// };

// export default Login;
