import React, { useState } from "react";
import axios from "axios";
import OtpInput from "./otpInput";

export default function VerifyPhone() {
  const [phone, setPhone] = useState("");
  const [closeModal, setCloseModal] = useState(false);
  const [phoneRrror, setPhoneError] = useState("");
  const [phoneSuccess, setPhoneSuccess] = useState("");
  const [apiErr, setApiErr] = useState([]);
  const [phoneVerifiedStatus, setPhoneVerifiedStatus] = useState(false);
  console.log(window.location.pathname?.split("/"))

  const verifyPhone = (phoneNum) => {
    const phoneRegex =
      /^(?:(?:\+|00)\d{1,3}\s?)?(?:\d{2,4}[\s.-]?)?(?:\d{3}[\s.-]?){2}\d{2,4}$/;
    return phoneRegex.test(phoneNum);
  };

  const handlePhoneVerification = async () => {

    setPhoneError("");
    setApiErr([]);
    setPhoneSuccess("");
    try {

      if (phone && verifyPhone(phone)) {
        const response = await axios.post(
          "https://hrmbackdoor.globalcrmsoftware.com/api/hrm-candidate/auth/verify-phone",
          {
            mobile: phone,
            token: window.location.pathname?.split("/")[3],
          }
        );
        if (response?.data?.status) {
          localStorage.setItem("mobile", phone);
          setPhoneSuccess(response?.data?.message);
          setPhoneVerifiedStatus(true);
          localStorage.setItem("interviewStatus", window.location.pathname?.split("/")[4])
        } else {
          console.log(response?.data?.message);
          setApiErr([{ phone: response?.data?.message }]);
          // setPhoneError(response?.data?.errors?.mobile.message)
        }
      } else {
        setPhoneError("Phone number required");
      }
    } catch (err) {
      console.log("err", err?.response?.data?.errors);
      if (err?.response?.data?.errors) {
        setApiErr([err?.response?.data?.errors]);
      } else {
        setApiErr([{ phone: err?.response?.data?.message }]);
      }
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhone(e.target.value);
  };
  return (
    <>
      <div className="container">
        <div className="w-full min-h-screen p-5 md:p-20 flex items-center justify-center">
          <div className="w-96 intro-y">
            <img
              className="mx-auto"
              alt="Rocketman - Tailwind HTML Admin Template"
              src="/hrLogo.png"
            />
            <div className="text-white dark:text-slate-300 text-2xl font-medium text-center mt-14">
              {!phoneVerifiedStatus
                ? "Verify Your Phone Number"
                : "OTP Verification"}
            </div>
            {!phoneVerifiedStatus ? (
              <div className="box px-5 py-8 mt-10 max-w-[450px] relative before:content-[''] before:z-[-1] before:w-[95%] before:h-full before:bg-slate-200 before:border before:border-slate-200 before:-mt-5 before:absolute before:rounded-lg before:mx-auto before:inset-x-0 before:dark:bg-darkmode-600/70 before:dark:border-darkmode-500/60">
                <label>Enter your phone number</label>
                <input
                  type="text"
                  value={phone}
                  className="form-control py-3 px-4 block"
                  placeholder="Phone number"
                  onChange={handlePhoneNumberChange}
                />
                {phoneRrror && (
                  <p
                    className="!text-red-600 font-bold"
                    style={{ color: "red" }}
                  >
                    {phoneRrror}
                  </p>
                )}
                {apiErr?.length > 0 &&
                  apiErr?.map((val, ind) => {
                    return Object?.values(val).map((er, ind) => (
                      <p className="font-bold" style={{ color: "red" }}>
                        {er}
                      </p>
                    ));
                  })}
                {phoneSuccess && (
                  <p className="font-bold" style={{ color: "green" }}>
                    {phoneSuccess}
                  </p>
                )}

                <div className="mt-5 xl:mt-8 text-center xl:text-left">
                  <button
                    className="btn btn-primary w-full xl:mr-3"
                    onClick={handlePhoneVerification}
                  >
                    Verify
                  </button>
                </div>
              </div>
            ) : (
              <>
                <OtpInput />
              </>
            )}
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
