import Title from "./Title.jsx";
 import { BiSupport } from "react-icons/bi";





function OurPolicy() {
  return (
    <section className="w-screen h-[68vh] flex flex-col items-center justify-start bg-gradient-to-l from-[#141414] to-[#0c2025]">
      <div className="h-[8%] w-full text-center mt-20">
        <Title text1="OUR" text2="POLICY" />
      </div>
      <p className="w-3/4 mt-6 text-lg text-blue-300 text-center">
        Customer-Friendly Policies 🛡️ Committed to Your Satisfaction and Safety.
      </p>



<div className="w-full flex items-center justify-center gap-10 flex-nowrap">

  <div className="w-[280px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-[10px]">
    <BiSupport className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]" />
    <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
      Best Customer Support
    </p>
    <p className="font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center">
      Trusted Customer Support Your Satisfaction Is Our Priority.
    </p>
  </div>

  <div className="w-[280px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-[10px]">
    <BiSupport className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]" />
    <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
      Easy Returns
    </p>
    <p className="font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center">
      Hassle-free returns within 7 days.
    </p>
  </div>

  <div className="w-[280px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-[10px]">
    <BiSupport className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]" />
    <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
      Secure Payment
    </p>
    <p className="font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center">
      100% secure and safe payment options.
    </p>
  </div>

</div>






      {/* <div className="w-[400px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-[10px]">
  <BiSupport className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]" />
  <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
    Best Customer Support
  </p>
  <p className="font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center">
    Trusted Customer Support Your Satisfaction Is Our Priority.
  </p>
</div> */}


{/* <div className="w-[400px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-[10px]">
  <BiSupport className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]" />
  <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
    Best Customer Support
  </p>
  <p className="font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center">
    Trusted Customer Support Your Satisfaction Is Our Priority.
  </p>
</div> */}


{/* <div className="w-[400px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-[10px]">
  <BiSupport className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]" />
  <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
    Best Customer Support
  </p>
  <p className="font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center">
    Trusted Customer Support Your Satisfaction Is Our Priority.
  </p>
</div> */}

    </section>
  );
}

export default OurPolicy;


