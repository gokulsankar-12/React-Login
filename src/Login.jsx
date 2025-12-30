import React, { useState } from 'react';
import Button from './button';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    const { email, password, remember } = formData;

    // 1. Check Username/Email
    if (!email) {
      newErrors.email = "Email is required";
    } else if (email !== "exl2025@gmail.com") {
      newErrors.email = "Invalid email address";
    }

    // 2. Check Password Match & Complexity
    if (!password) {
      newErrors.password = "Password is required";
    } else {
      // 1. Check Complexity FIRST
      let passwordMessages = [];
      if (!/[A-Z]/.test(password)) passwordMessages.push("1 uppercase letter");
      if ((password.match(/\d/g) || []).length < 2) passwordMessages.push("2 numbers");
      if (!/[@$!%*?&]/.test(password)) passwordMessages.push("1 special character");

      if (passwordMessages.length > 0) {
        newErrors.password = "Weak password add : " + passwordMessages.join(", ");
      }
      // 2. Then check if it matches the specific account password
      else if (password !== "Exl@2025") {
        newErrors.password = "Incorrect password";
      }
    }

    // 3. Check Remember Me
    if (!remember) {
      newErrors.remember = "Please select Remember me to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Login Successful!");
      console.log("Logged in with:", formData.email);

      setFormData({
        email: '',
        password: '',
        remember: false
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    // This removes the error message for this specific field as soon as you type
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="flex bg-white rounded-2xl shadow-xl w-full max-w-6xl text-black overflow-hidden">
      {/* Left Form Side */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10">
        <div className="mb-10 sm:mb-14 md:mb-20">
          <img className="w-20" src="./public/EXL_Service_logo.png" alt="Logo" />
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center">Welcome Back</h2>
        <p className="text-gray-500 mb-6 text-center">Enter your credentials to access your account</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exl2025@gmail.com"
              className={`w-full border p-3 rounded-xl focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 ring-red-200' : 'focus:ring-blue-500'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

            <label className="block mt-5 mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Exl@2025"
              className={`w-full border p-3 rounded-xl focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 ring-red-200' : 'focus:ring-blue-500'}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-sm text-gray-500">Remember me</label>
              </div>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:underline">Forget Password?</a>
            </div>
            {errors.remember && <p className="text-red-500 text-sm mt-2">{errors.remember}</p>}
          </div>

          <Button type="submit">Log In</Button>
        </form>
        <div className="flex items-center justify-center gap-1 mt-6">
          <h3 className="text-gray-500">Don’t have an account?</h3>
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Register Now
          </a>
        </div>
      </div>

      {/* Right Side (The part you asked for) */}
      <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-blue-600 to-indigo-700 items-center justify-center p-10 relative">
        <div className="text-white max-w-md">
          <h2 className="text-3xl font-bold mb-4">
            Effortlessly manage your team and operations.
          </h2>
          <p className="text-blue-100 mb-6">
            Log in to access your dashboard and manage everything in one place.
          </p>
          <img
            src="./public/image.jpg"
            alt="Dashboard"
            className="rounded-xl shadow-xl block mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;