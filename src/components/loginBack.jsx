/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import PropTypes from 'prop-types';
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { Float, Environment, Lightformer } from "@react-three/drei";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./login.css";
import "./login-back.css"

function LoginBack({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('https://health-connect-pfqv.onrender.com/login', { Email: email, Password: password });

      console.log("Full Login Response:", response.data);

      if (response.data.message === "success") {
        localStorage.setItem("userId", response.data.userId); // ✅ Store userId for later use
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
        navigate('/home');// Redirect to home page
      } else {
        setError(response.data.message); // Show error message
      }
    } catch (error) {
      setError("Incorrect credentials, please check again");
      console.error("Login Error:", error);
    }
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
        {error && <div className="alert alert-danger">{error}</div>} 
            <form onSubmit={handleSubmit}>
        <input 
                  type="email" 
                  className="form"
                  id="email" 
                  placeholder="Enter your email" 
                  required 
                  onChange={(e) => setEmail(e.target.value)} 
                />
        <input 
                  type="password" 
                  className="form"
                  id="password" 
                  placeholder="Enter your password" 
                  required  
                  onChange={(e) => setPassword(e.target.value)} 
                />
        <button className="w-full login bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
          Log In
        </button>
        </form>
        <p className="text-center mt-3">
              Don't have an account? <a href="/SignupPage">Sign Up</a>
            </p>
      </motion.div>
    </div>
  );
}

LoginBack.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default LoginBack;