import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import logo from "../assetss/logo.png";
import img from "../assetss/cartimage.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/feature/User"; 


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData))
      .unwrap()
      .then((res) => {
        console.log("Login successful:", res);

        setFormData({
          email: "",
          password: "",
        });

        navigate("/");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center">

      {/* Header */}
      <div
        className="w-full h-[80px] flex items-center px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={img} alt="logo" />
        <h1 className="text-[22px] font-sans">E-commerce</h1>
      </div>

      {/* Title */}
      <div className="w-full h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Login Page</span>
      </div>

      {/* Form */}
      <div className="max-w-[600px] w-[90%] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">

        <form
          className="w-[90%] py-[20px] flex flex-col gap-[20px]"
          onSubmit={handleSubmit}
        >

          

          {/* Divider */}
          {/* <div className="flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]" />
            <span>OR</span>
            <div className="w-[40%] h-[1px] bg-[#96969635]" />
          </div> */}

          {/* Inputs */}
          <div className="flex flex-col gap-[15px] relative">

            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full h-[50px] border border-[#96969635] rounded-lg bg-transparent px-[20px]"
            />

            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                name="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="w-full h-[50px] border border-[#96969635] rounded-lg bg-transparent px-[20px]"
              />

              {!show ? (
                <IoEyeOutline
                  className="absolute right-[10px] top-[15px] cursor-pointer"
                  onClick={() => setShow(true)}
                />
              ) : (
                <FaEye
                  className="absolute right-[10px] top-[15px] cursor-pointer"
                  onClick={() => setShow(false)}
                />
              )}
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className="w-full h-[50px] bg-[#6060f5] rounded-lg font-semibold mt-[10px]"
            >
              {loading ? "Logging in..." : "Login Account"}
            </button>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm text-center">
                {error || "Login failed"}
              </p>
            )}

            {/* Success */}
            {!error && message && (
              <p className="text-green-400 text-sm text-center">
                {message}
              </p>
            )}

            {/* Signup link */}
            <p className="flex gap-[10px] justify-center">
              Don’t have an account?
              <span
                className="text-[#5555f6cf] cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Register
              </span>
            </p>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;