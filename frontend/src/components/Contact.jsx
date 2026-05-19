// import Title from "./Title.jsx";
// import contact from "../assetss/OIG4.jpg";

// function Contact() {
//   return (
//     <div className='w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px]'>
//       <Title text1={'CONTACT'} text2={'US'}/>
//       <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
//         <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
//           <img src={contact} alt="" className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm'/>
//         </div>
//         <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Contact;


import React from "react";
import Title from "./Title.jsx";
import contact from "../assetss/OIG4.jpg";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px] pb-[80px]">

      {/* TITLE */}
      <Title text1={"CONTACT"} text2={"US"} />

      <div className="w-full flex items-center justify-center flex-col lg:flex-row">

        {/* IMAGE */}
        <div className="lg:w-[50%] w-full flex items-center justify-center">
          <img
            src={contact}
            alt="contact"
            className="lg:w-[70%] w-[80%] shadow-lg shadow-black rounded-lg"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:w-[50%] w-[90%] flex flex-col gap-[25px] mt-[30px] lg:mt-[0px]  lg:mx-[35px]">

          {/* INFO CARDS */}
          <div className="flex flex-col gap-[15px]">

            <div className="flex items-center gap-[15px] text-white bg-[#111]/80 p-[15px] rounded-lg border border-white/10">
              <FaPhoneAlt className="text-[#bff1f9]" />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-[15px] text-white bg-[#111]/80 p-[15px] rounded-lg border border-white/10">
              <FaEnvelope className="text-[#bff1f9]" />
              <span>support@onecart.com</span>
            </div>

            <div className="flex items-center gap-[15px] text-white bg-[#111]/80 p-[15px] rounded-lg border border-white/10">
              <FaMapMarkerAlt className="text-[#bff1f9]" />
              <span>Ranchi, Jharkhand, India</span>
            </div>

          </div>

          {/* FORM */}
          <div className="bg-[#111]/80 p-[25px] rounded-lg border border-white/10 flex flex-col gap-[15px]">

            <input
              type="text"
              placeholder="Your Name"
              className="p-[10px] rounded bg-transparent border border-white/20 text-white outline-none focus:border-[#bff1f9]"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="p-[10px] rounded bg-transparent border border-white/20 text-white outline-none focus:border-[#bff1f9]"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="p-[10px] rounded bg-transparent border border-white/20 text-white outline-none focus:border-[#bff1f9]"
            />

            <button className="bg-[#bff1f9] text-black font-semibold py-[10px] rounded hover:bg-[#9de3ec] transition-all duration-300">
              Send Message
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;