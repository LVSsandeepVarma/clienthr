import React, { useState } from "react";
import OtpInput from "./otpInput";
export default function VerifyOtp() {
  const [otp, setotp] = useState("");
  const [otpError, setOtpError] = useState("");

  return (
    <>
      <div className="container">
        <div className="w-full min-h-screen p-5 md:p-20 flex items-center justify-center">
          <div className="w-96 intro-y">
            <img
              className="mx-auto "
              alt="Rocketman - Tailwind HTML Admin Template"
              src="/hrLogo.png"
            />
            <div className="text-white dark:text-slate-300 text-2xl font-medium text-center mt-14">
              Verify OTP
            </div>
            <OtpInput />
          </div>
        </div>
      </div>
      <div
        data-url="side-menu-dark-dashboard-overview-1.html"
        className="dark-mode-switcher cursor-pointer shadow-md fixed bottom-0 right-0 box border rounded-full w-40 h-12 flex items-center justify-center z-50 mb-10 mr-10"
      >
        <div className="mr-4 text-slate-600 dark:text-slate-200">Dark Mode</div>
        <div className="dark-mode-switcher__toggle border"></div>
      </div>
      {/* <!-- END: Dark Mode Switcher--> */}
    </>
  );
}
