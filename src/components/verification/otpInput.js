import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OtpInput() {
  const [otpValues, setOTPValues] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpVerifySuccessMsg, setOtpVerifySuccessMsg] = useState("");
  const [apiErr, setApiErr] = useState([]);
  const navigate = useNavigate();

  const handleOtpVerification = async () => {
    setOtpError("");
    setOtpVerifySuccessMsg("");
    setApiErr([]);

    console.log("verified", otpValues);
    const otpString = otpvalues?.join("");
    console.log(otpString);
    if (otpString) {
      console.log(otpValues, "verified");
      const mobile = localStorage.getItem("mobile");
      try {
        const response = await axios.post(
          "https://hrmbackdoor.globalcrmsoftware.com/api/hrm-candidate/auth/verify-otp",
          {
            mobile: mobile,
            otp: otpString,
            token: window.location.pathname?.split("/")[3],
          }
        );
        if (response?.data?.status) {
          setOtpVerifySuccessMsg(response?.data?.message);
          localStorage.setItem("token", response.data?.access_token);
          setTimeout(() => {
            navigate("/candidate/dashboard");
          }, 2000);
        } else {
          setApiErr([response?.data?.errors]);
        }
      } catch (err) {
        console.log(err?.response?.data?.message)
        if(err?.response?.data?.errors){
          setApiErr([err?.response?.data?.errors]);
        }else{
          setApiErr([{otpError:err?.response?.data?.message}]);
          setOTPValues(["", "", "", ""])
        }
      }
    } else {
      setOtpError("otp required");
      // setOTPValues(["", "", "", ""])
    }
    
  };

  const handleChange = (index, event) => {
    setOtpError("");
    const { value } = event.target;
    setOTPValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });

    // Move focus to the next input box if there's only one character
    if (value.length === 1 && index < otpvalues?.length - 1) {
      const nextInput = event.target.nextSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    // Clear the current box value on backspace
    if (event.key === "Backspace") {
      event.preventDefault(); // Prevent the default behavior of Backspace (clearing the previous input)

      // Clear the current input value
      setOTPValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = "";
        return newValues;
      });

      // Move focus to the previous input box if not the first box
      if (index > 0) {
        const prevInput = event.target.previousSibling;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const handlePaste = (event) => {
    const pastedData = event.clipboardData.getData("text/plain");

    if (pastedData.length === 0) return;

    // Check if the pasted data contains non-numeric characters
    if (!/^\d+$/.test(pastedData)) {
      event.preventDefault();
      return;
    }

    const newValues = [...otpValues];

    // Extract individual digits from the pasted data and update the OTP values
    for (let i = 0; i < pastedData.length && i < newvalues?.length; i++) {
      newValues[i] = pastedData.charAt(i);
    }

    setOTPValues(newValues);

    // Move focus to the last input box
    const lastInput = event.target.nextSibling.nextSibling.nextSibling;
    if (lastInput) {
      lastInput.focus();
    }
  };

  return (
    <>
      <div className="text-center box px-5 py-8 mt-10 max-w-[450px] relative before:content-[''] before:z-[-1] before:w-[95%] before:h-full before:bg-slate-200 before:border before:border-slate-200 before:-mt-5 before:absolute before:rounded-lg before:mx-auto before:inset-x-0 before:dark:bg-darkmode-600/70 before:dark:border-darkmode-500/60">
        <label className="space-x-2">Enter your OTP</label>
        <div className="flex justify-center items-center space-x-2 ">
          {otpvalues?.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={value}
              className="w-12 h-12 text-center border border-gray-400 rounded focus:border-blue-500 focus:outline-none ml-2 mt-2 mb-2"
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
            />
          ))}
        </div>
        {otpError && (
          <p className="font-bold" style={{ color: "red" }}>
            {otpError}
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
        {otpVerifySuccessMsg && (
          <p className="font-bold" style={{ color: "green" }}>
            {otpVerifySuccessMsg}
          </p>
        )}

        <div className="mt-5 xl:mt-8 text-center xl:text-left">
          <button
            className="btn btn-primary w-full xl:mr-3"
            onClick={handleOtpVerification}
          >
            Verify
          </button>
        </div>
      </div>
    </>
  );
}
