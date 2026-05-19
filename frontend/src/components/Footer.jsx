

import React from "react";

const Footer = () => {
  return (
    <footer className="w-full  bg-gradient-to-l from-[#141414] to-[#0c2025] text-[#aaf5fa] border-t border-[#1f3a40]">

      {/* Top Section */}
      <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-10">

        {/* Column 1 */}
        <div>
          <h2 className="text-[20px] font-semibold text-white mb-4">
            ShopSphere
          </h2>
          <p className="text-[14px] text-gray-400 leading-relaxed">
            Your one-stop destination for fashion, electronics, and more.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-[16px] font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-[14px] text-gray-400">
            <li className="hover:text-[#46d1f7] cursor-pointer">About Us</li>
            <li className="hover:text-[#46d1f7] cursor-pointer">Careers</li>
            <li className="hover:text-[#46d1f7] cursor-pointer">Blog</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-[16px] font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-[14px] text-gray-400">
            <li className="hover:text-[#46d1f7] cursor-pointer">Help Center</li>
            <li className="hover:text-[#46d1f7] cursor-pointer">Returns</li>
            <li className="hover:text-[#46d1f7] cursor-pointer">Shipping</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-[16px] font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-[14px] text-gray-400">
            <li>Email: support@shopsphere.com</li>
            <li>Phone: +91 98765 43210</li>
            <li className="hover:text-[#46d1f7] cursor-pointer">Contact Us</li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-[#1f3a40]" />

      {/* Bottom Section */}
      <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-[13px] text-gray-500">

        <p>© 2026 ShopSphere. All rights reserved.</p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <span className="hover:text-[#46d1f7] cursor-pointer">Privacy</span>
          <span className="hover:text-[#46d1f7] cursor-pointer">Terms</span>
          <span className="hover:text-[#46d1f7] cursor-pointer">Cookies</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;