import React, { useState } from "react";
import "./AuthForm.css";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSigninPassword, setShowSigninPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSignInClick = () => setIsSignUp(false);
  const handleSignUpClick = () => setIsSignUp(true);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
  const toggleSigninPassword = () => setShowSigninPassword((prev) => !prev);

  // ✅ Sign Up Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signUpPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:1337/api/auth/local/register", {
        username,
        email: signUpEmail,
        password: signUpPassword,
      });

      localStorage.setItem("token", res.data.jwt);
      setMessage("Registration Successful!");

      // Clear fields
      setUsername("");
      setSignUpEmail("");
      setSignUpPassword("");
      setConfirmPassword("");

      navigate("/main");
    } catch (err) {
      console.error(err);
      setMessage("Error Registering User");
    }
  };

  // ✅ Sign In Submit
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: signInEmail,
        password: signInPassword,
      });

      localStorage.setItem("token", res.data.jwt);
      setMessage("Login Successful!");
      navigate("/main");
    } catch (err) {
      console.error(err);
      setMessage("Invalid Credentials");
    }
  };

  return (
    <div className="wrapper">
      <div className={`container ${isSignUp ? "active" : ""}`} id="container">
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Name"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="email-signup">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email-signup"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              required
            />

            <label htmlFor="password-signup">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password-signup"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-5 right-5 flex items-center text-gray-500 cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>

            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-5 right-5 flex items-center text-gray-500 cursor-pointer"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in">
          <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <div className="relative w-full">
              <input
                type={showSigninPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-5 right-5 flex items-center text-gray-500 cursor-pointer"
                onClick={toggleSigninPassword}
              >
                {showSigninPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>

            <button type="submit">Sign In</button>
            <button>Google</button>
          </form>
        </div>

        {/* Toggle Panel */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all site features</p>
              <button className="hid" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome to ToDo app!</h1>
              <p>Register to access all features of our app</p>
              <button className="hid" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
