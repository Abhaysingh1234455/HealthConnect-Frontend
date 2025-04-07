/* eslint-disable react/no-unknown-property */
import PropTypes from 'prop-types';
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { Float, Environment, Lightformer } from "@react-three/drei";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login-back.css";
import "./login.css";

function NewSignup({ setIsAuthenticated }) {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Email.endsWith('@gmail.com')) {
      alert('Only Gmail addresses are allowed.');
      return;
    }

    if (Password !== ConfirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    axios.post('https://health-connect-pfqv.onrender.com/SignupPage', { Name, Email, Password })
      .then(result => {
        if (result.data.success) {
          localStorage.setItem("userId", result.data.user._id); // ✅ Fixed this
          localStorage.setItem('user', JSON.stringify(result.data.user));
          setIsAuthenticated(true);
          navigate('/home');
        } else {
          alert('Error during signup: ' + result.data.message);
        }
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <mesh>
              <sphereGeometry args={[1.5, 64, 64]} />
              <meshStandardMaterial color="cyan" emissive="blue" emissiveIntensity={0.5} roughness={0.3} metalness={0.8} />
            </mesh>
          </Float>
          <Environment preset="sunset" />
          <Lightformer form="ring" intensity={2} position={[0, 3, 2]} scale={2} color="white" />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
        </Suspense>
      </Canvas>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute bg-white p-10 rounded-3xl shadow-2xl z-10 flex flex-col items-center max-w-sm w-full backdrop-blur-lg bg-opacity-80 border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold mb-4 health">HealthConnect</h2>
        <p className="text-gray-600 mb-6 text-center">Your gateway to seamless healthcare</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form"
              id="name"
              placeholder="Enter your full name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form"
              id="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form"
              id="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <a href="/">Login</a>
        </p>
      </motion.div>
    </div>
  );
}

NewSignup.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default NewSignup;
