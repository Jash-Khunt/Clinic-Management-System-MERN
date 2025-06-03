import React, { useState } from "react";
import signupImg from "../assets/images/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { HashLoader } from "react-spinners";
const Signup = () => {
  const navigate = useNavigate();
  const { handleSignUp } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleSignUp(formData);
      navigate("/");
    } catch (error) {
      console.error("SignUp failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container xl:px-0">
      <div className="max-w-[1170px] service">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>

          <div className="rounded-l-lg lg:pl-16 py-10 doctor">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="sli mb-5">
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Full Name"
                  required
                  className="w-full form border-b border-solid border-[#0066ff61] text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer focus:outline-none focus:border-b-primaryColor transition"
                />
              </div>

              <div className="sli mb-5">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  required
                  className="w-full form border-b border-solid border-[#0066ff61] text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer focus:outline-none focus:border-b-primaryColor transition"
                />
              </div>

              <div className="sli mb-5">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  required
                  className="w-full form border-b border-solid border-[#0066ff61] text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer focus:outline-none focus:border-b-primaryColor transition"
                />
              </div>

              <div className="sli mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="ml-3 text-textColor font-semibold text-[15px] leading-7 form focus:outline-none"
                  >
                    <option value="doctor">Doctor</option>
                    <option value="receptionist">Receptionist</option>
                  </select>
                </label>
              </div>

              <div className="photo faqs mb-5">
                <button
                  type="submit"
                  className="form w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg font-medium hover:bg-primaryColor/90 transition"
                  disabled={loading}
                >
                  {loading ? (
                    <HashLoader size={25} color="#ffffff" />
                  ) : (
                    "Signup"
                  )}
                </button>
              </div>

              <p className="copy text-textColor text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primaryColor font-medium">
                  login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
