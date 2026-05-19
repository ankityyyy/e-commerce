// import React, { useState } from "react";
// import { FaEye } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { IoEyeOutline } from "react-icons/io5";
// import logo from "../assetss/logo.png";
// import img from "../assetss/cartimage.png";

// import { useDispatch, useSelector } from "react-redux";
// import { signup } from "../redux/feature/User.jsx";

// function Signup() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { error, loading, message } = useSelector((state) => state.auth);

//   const [show, setShow] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(signup(formData))
//       .unwrap()
//       .then((res) => {
//         console.log("Signup successful:", res);

//         // reset only after success
//         setFormData({
//           name: "",
//           email: "",
//           password: "",
//         });

//         navigate("/login");
//       })
//       .catch((err) => {
//         console.error("Signup failed:", err);
//       });
//   };

//   return (
//     <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      
//       {/* Header */}
//       <div
//         className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
//         onClick={() => navigate("/")}
//       >
//         <img className="w-[40px]" src={img} alt="logo" />
//         <h1 className="text-[22px] font-sans">E-commerce</h1>
//       </div>

//       {/* Title */}
//       <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
//         <span className="text-[25px] font-semibold">Registration Page</span>
//       </div>

//       {/* Form */}
//       <div className="max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        
//         <form
//           className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
//           onSubmit={handleSubmit}
//         >

//           {/* Google Signup */}
//           <div className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] cursor-pointer">
//             <img src={logo} alt="google" className="w-[20px]" />
//             <span>Registration with Google</span>
//           </div>

//           {/* Divider */}
//           <div className="w-[100%] flex items-center justify-center gap-[10px]">
//             <div className="w-[40%] h-[1px] bg-[#96969635]" />
//             <span>OR</span>
//             <div className="w-[40%] h-[1px] bg-[#96969635]" />
//           </div>

//           {/* Inputs */}
//           <div className="w-[90%] flex flex-col gap-[15px] relative">

//             <input
//               type="text"
//               placeholder="Username"
//               name="name"
//               required
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, [e.target.name]: e.target.value })
//               }
//               className="w-full h-[50px] border-[2px] border-[#96969635] rounded-lg bg-transparent px-[20px]"
//             />

//             <input
//               type="email"
//               placeholder="Email"
//               name="email"
//               required
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, [e.target.name]: e.target.value })
//               }
//               className="w-full h-[50px] border-[2px] border-[#96969635] rounded-lg bg-transparent px-[20px]"
//             />

//             <div className="relative">
//               <input
//                 type={show ? "text" : "password"}
//                 placeholder="Password"
//                 name="password"
//                 required
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, [e.target.name]: e.target.value })
//                 }
//                 className="w-full h-[50px] border-[2px] border-[#96969635] rounded-lg bg-transparent px-[20px]"
//               />

//               {!show ? (
//                 <IoEyeOutline
//                   className="absolute right-[10px] top-[15px] cursor-pointer"
//                   onClick={() => setShow(true)}
//                 />
//               ) : (
//                 <FaEye
//                   className="absolute right-[10px] top-[15px] cursor-pointer"
//                   onClick={() => setShow(false)}
//                 />
//               )}
//             </div>

//             {/* Button */}
//             <button
//               disabled={loading}
//               className="w-full h-[50px] bg-[#6060f5] rounded-lg mt-[10px] font-semibold"
//             >
//               {loading ? "Creating..." : "Create Account"}
//             </button>

//             {/* Error Message */}
//             {error && (
//               <p className="text-red-400 text-sm text-center">{error}</p>
//             )}

//             {/* Login Link */}
//             <p className="flex gap-[10px] justify-center">
//               Already have an account?
//               <span
//                 className="text-[#5555f6cf] cursor-pointer"
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </span>
//             </p>

//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;


import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import logo from "../assetss/logo.png";
import img from "../assetss/cartimage.png";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/feature/User"; // ✅ fixed import

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signup(formData))
      .unwrap()
      .then((res) => {
        console.log("Signup successful:", res);

        setFormData({
          name: "",
          email: "",
          password: "",
        });

        navigate("/login");
      })
      .catch((err) => {
        console.error("Signup failed:", err);
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
        <span className="text-[25px] font-semibold">Registration Page</span>
      </div>

      {/* Form Container */}
      <div className="max-w-[600px] w-[90%] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">

        <form
          className="w-[90%] py-[20px] flex flex-col gap-[20px]"
          onSubmit={handleSubmit}
        >

          {/* ✅ Google Signup */}
          <button
            type="button"
            onClick={() => {
              window.location.href =
                "http://localhost:2000/user/v1/auth/google";
            }}
            className="w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] cursor-pointer"
          >
            <img src={logo} alt="google" className="w-[20px]" />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]" />
            <span>OR</span>
            <div className="w-[40%] h-[1px] bg-[#96969635]" />
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-[15px] relative">

            <input
              type="text"
              placeholder="Username"
              name="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full h-[50px] border border-[#96969635] rounded-lg bg-transparent px-[20px]"
            />

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
              {loading ? "Creating..." : "Create Account"}
            </button>

            {/* ❌ Error */}
            {error && (
              <p className="text-red-400 text-sm text-center">
                {error || "Something went wrong"}
              </p>
            )}

            {/* ✅ Success */}
            {!error && message && (
              <p className="text-green-400 text-sm text-center">
                {message}
              </p>
            )}

            {/* Login Link */}
            <p className="flex gap-[10px] justify-center">
              Already have an account?
              <span
                className="text-[#5555f6cf] cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;