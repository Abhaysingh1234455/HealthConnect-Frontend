/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { Float, Environment, Lightformer } from "@react-three/drei";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login-back.css";
import "./login.css";

function NewSignup({ setIsAuthenticated }) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const sendOtp = async () => {
    try {
      const response = await axios.post(
        "https://health-connect-pfqv.onrender.com/request-otp",
        { Email }
      );
      if (response.data.success) {
        toast.success("OTP sent to your email!");
        setOtpSent(true);
        setTimer(15);
      }
    } catch (error) {
      console.error("Error sending OTP", error);
      toast.error("Failed to send OTP.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!Email.endsWith("@gmail.com")) {
      toast.warning("Only Gmail addresses are allowed.");
      return;
    }

    if (Password !== ConfirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    if (!otpSent) {
      await sendOtp();
      return;
    }

    try {
      const result = await axios.post(
        "https://health-connect-pfqv.onrender.com/SignupPage",
        {
          Name,
          Email,
          Password,
          otp,
        }
      );

      if (result.data.success) {
        localStorage.setItem("userId", result.data.user._id);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        setIsAuthenticated(true);
        toast.success("Signup successful!");
        navigate("/home");
      } else {
        toast.error(result.data.message || "Signup failed.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Signup error. Please try again.");
      }
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <mesh>
              <sphereGeometry args={[1.5, 64, 64]} />
              <meshStandardMaterial
                color="cyan"
                emissive="blue"
                emissiveIntensity={0.5}
                roughness={0.3}
                metalness={0.8}
              />
            </mesh>
          </Float>
          <Environment preset="sunset" />
          <Lightformer
            form="ring"
            intensity={2}
            position={[0, 3, 2]}
            scale={2}
            color="white"
          />
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
        <p className="text-gray-600 mb-6 text-center">
          Your gateway to seamless healthcare
        </p>

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form"
              placeholder="Enter your full name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form"
              placeholder="Confirm your password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {otpSent && (
            <>
              <div className="mb-3">
                <label className="form-label">Enter OTP</label>
                <input
                  type="text"
                  className="form"
                  placeholder="Enter the OTP sent to email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 text-sm text-gray-600">
                {timer > 0 ? (
                  <>⏳ Resend OTP in {timer}s</>
                ) : (
                  <button
                    type="button"
                    onClick={sendOtp}
                    className="text-blue-600 underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary w-100">
            {otpSent ? "Verify OTP & Sign Up" : "Send OTP"}
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <a href="/">Login</a>
        </p>
      </motion.div>
      <ToastContainer position="top-center" />
    </div>
  );
}

NewSignup.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default NewSignup;
