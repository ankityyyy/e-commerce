import React from "react";
import Title from "../components/Title";
import about from "../assetss/about.png";

function About() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center gap-[50px] pt-[80px] pb-[80px]">

      {/* ABOUT SECTION */}
      <Title text1={"ABOUT"} text2={"US"} />

      <div className="w-full flex items-center justify-center flex-col lg:flex-row">

        {/* IMAGE */}
        <div className="lg:w-[50%] w-full flex items-center justify-center">
          <img
            src={about}
            alt=""
            className="lg:w-[65%] w-[80%] shadow-md shadow-black rounded-sm"
          />
        </div>

        {/* TEXT */}
        <div className="lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]">

          <p className="lg:w-[80%] w-full text-white md:text-[16px] text-[13px]">
            OneCart born for smart, seamless shopping—created to deliver quality
            products, trending styles, and everyday essentials in one place.
            With reliable service, fast delivery, and great value, OneCart
            makes your online shopping experience simple, satisfying, and
            stress-free.
          </p>

          <p className="lg:w-[80%] w-full text-white md:text-[16px] text-[13px]">
            OneCart born for smart, seamless shopping—created to deliver quality
            products, trending styles, and everyday essentials in one place.
            With reliable service, fast delivery, and great value, OneCart
            makes your online shopping experience simple, satisfying, and
            stress-free.
          </p>

          <p className="lg:w-[80%] w-full text-white text-[15px] lg:text-[18px] mt-[10px] font-bold">
            Our Mission
          </p>

          <p className="lg:w-[80%] w-full text-white md:text-[16px] text-[13px]">
            OneCart born for smart, seamless shopping—created to deliver quality
            products, trending styles, and everyday essentials in one place.
            With reliable service, fast delivery, and great value, OneCart
            makes your online shopping experience simple, satisfying, and
            stress-free.
          </p>

        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="w-full flex items-center justify-center flex-col gap-[10px]">

        <Title text1={"WHY"} text2={"CHOOSE US"} />

        <div className="w-[80%] flex items-center justify-center lg:flex-row flex-col gap-[20px] py-[40px]">

          {/* CARD 1 */}
          <div className="lg:w-[33%] w-[90%] h-[250px] border border-white/10 
          flex items-center justify-center flex-col gap-[20px] 
          px-[40px] py-[10px] text-white 
          bg-[#111]/80 rounded-lg 
          hover:bg-[#111] transition-all duration-300">

            <b className="text-[20px] font-semibold text-[#bff1f9]">
              Quality Assurance
            </b>

            <p className="text-center text-[14px]">
              We guarantee quality through strict checks, reliable sourcing, and
              a commitment to customer satisfaction always.
            </p>

          </div>

          {/* CARD 2 */}
          <div className="lg:w-[33%] w-[90%] h-[250px] border border-white/10 
          flex items-center justify-center flex-col gap-[20px] 
          px-[40px] py-[10px] text-white 
          bg-[#111]/80 rounded-lg 
          hover:bg-[#111] transition-all duration-300">

            <b className="text-[20px] font-semibold text-[#bff1f9]">
              Fast Delivery
            </b>

            <p className="text-center text-[14px]">
              Experience lightning-fast delivery with our optimized logistics
              system ensuring your products arrive on time.
            </p>

          </div>

          {/* CARD 3 */}
          <div className="lg:w-[33%] w-[90%] h-[250px] border border-white/10 
          flex items-center justify-center flex-col gap-[20px] 
          px-[40px] py-[10px] text-white 
          bg-[#111]/80 rounded-lg 
          hover:bg-[#111] transition-all duration-300">

            <b className="text-[20px] font-semibold text-[#bff1f9]">
              24/7 Support
            </b>

            <p className="text-center text-[14px]">
              Our support team is always ready to assist you anytime, ensuring a
              smooth and hassle-free experience.
            </p>

          </div>

        </div>
      </div>

    </div>
  );
}

export default About;