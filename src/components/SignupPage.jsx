// import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import "./login.css"

// function SignupPage({ setIsAuthenticated }) {
//     const [Name, setName] = useState('');
//     const [Email, setEmail] = useState('');
//     const [Password, setPassword] = useState('');
//     const [ConfirmPassword, setConfirmPassword] = useState('');
//     const navigate = useNavigate()

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (Password !== ConfirmPassword) {
//             alert('Passwords do not match. Please try again.');
//             return;
//         }

//         axios.post('http://localhost:3001/SignupPage', { Name, Email, Password })
//             .then(result => {
//                 if (result.data.success) {
//                     // Automatically log in the user after sign up
//                     setIsAuthenticated(true);  // Assuming you set the user as authenticated in the parent component
//                     localStorage.setItem('user', JSON.stringify(result.data.user)); // Save the user in localStorage
//                     navigate('/home');  // Redirect to home after successful signup
//                 } else {
//                     alert('Error during signup: ' + result.data.message);  // Show error if signup fails
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//                 alert('An error occurred. Please try again later.');
//             });
//     };

//     return (
//         <div className="container mt-5" id='SignupPage'>
//             <div className="row justify-content-center">
//                 <div className="col-md-6">
//                     <div className="card shadow-lg p-4">
//                         <h2 className="text-center mb-4">Sign Up</h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-3">
//                                 <label htmlFor="name" className="form-label">Full Name</label>
//                                 <input type="text" className="form" id="name" placeholder="Enter your full name" required
//                                     onChange={(e) => setName(e.target.value)} />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="email" className="form-label">Email address</label>
//                                 <input type="email" className="form" id="email" placeholder="Enter your email" required
//                                     onChange={(e) => setEmail(e.target.value)} />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="password" className="form-label">Password</label>
//                                 <input type="password" className="form" id="password" placeholder="Enter your password" required
//                                     onChange={(e) => setPassword(e.target.value)} />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//                                 <input type="password" className="form" id="confirmPassword" placeholder="Confirm your password" required
//                                     onChange={(e) => setConfirmPassword(e.target.value)} />
//                             </div>
//                             <button type="submit" className="btn btn-primary w-100">Sign Up</button>
//                         </form>
//                         <p className="text-center mt-3">
//                             Already have an account? <a href="/">Login</a>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// SignupPage.propTypes = {
//     setIsAuthenticated: PropTypes.func.isRequired,  // This line ensures 'setIsAuthenticated' is passed as a function
//   };
  
// export default SignupPage;
