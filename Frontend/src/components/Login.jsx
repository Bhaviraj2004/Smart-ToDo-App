import React, { useState } from "react";
import "./AuthForm.css";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import axios from "axios";


const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signinPassword, setSigninPassword] = useState(false);

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleSigninPassword = () => {
    setSigninPassword((prev) => !prev);
  }

  return (
    <div className="wrapper">
      <div className={`container ${isSignUp ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form>
            <h1 className="text-xl font-semibold mb-4">Create Account</h1>

            <label htmlFor="name">Name</label>
            <input type="text" placeholder="Name" id="name" required />

            <label htmlFor="email-signup">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email-signup"
              required
            />

            <label htmlFor="password-signup">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password-signup"
                required
              />
              <span
                className="absolute inset-y-5 right-5 flex items-center text-gray-500 cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <Eye size={18}  /> : <EyeOff size={18}  />}
              </span>
            </div>

            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                id="confirm-password"
                required
                // className="w-full pr-10"
              />
              <span
                className="absolute inset-y-5 right-5 flex items-center text-gray-500 cursor-pointer"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? <Eye size={18}  /> : <EyeOff size={18}  />}
              </span>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form>
            <h1 className="text-xl font-semibold">Sign In</h1>
            {/* <span>or use your email password</span> */}
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email" id="email" required />
            <label htmlFor="password">Password</label>
            <div className="relative w-full">
              <input
                type={signinPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                required
              />
              <span
                className="absolute inset-y-5 right-5 flex items-center text-gray-500 cursor-pointer"
                onClick={toggleSigninPassword}
              >
                {signinPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>
            {/* <a href="#">Forget Your Password?</a> */}
            <button type="submit">Sign In</button>
            <button>Google</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hid" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome to ToDo app!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button className="hid" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
