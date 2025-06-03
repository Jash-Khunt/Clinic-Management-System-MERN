import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { HashLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleLogin(formData);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-5 lg:px-0">
      <div className="w-full max-w-[500px] bg-white p-8 md:p-10 rounded-2xl shadow-lg">
        <h2 className="text-headingColor text-2xl md:text-3xl font-bold sli text-center">
          Hello! <span className="text-primaryColor">Welcome</span> Back 🎉
        </h2>

        <form onSubmit={handleSubmit} className="form space-y-6">
          <div className="sli">
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              className="w-full form border-b border-solid border-[#0066ff61] text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer focus:outline-none focus:border-b-primaryColor transition required"
            />
          </div>
          <div className="sli">
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              className="w-full form border-b border-solid border-[#0066ff61] text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer focus:outline-none focus:border-b-primaryColor transition required"
            />
          </div>

          <div className="photo faqs">
            <button
              type="submit"
              className="form w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg font-medium hover:bg-primaryColor/90 transition"
              disabled={loading}
            >
              {loading ? <HashLoader size={25} color="#ffffff" /> : "Login"}
            </button>
          </div>

          <p className="copy text-textColor text-center">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-primaryColor font-medium">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
