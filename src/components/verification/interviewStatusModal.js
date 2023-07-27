import React, { useState } from "react";
import axios from "axios";
import OtpInput from "./otpInput";

export default function InterviewStatusModal() {
  const [phone, setPhone] = useState("");
  const [closeModal, setCloseModal] = useState(false);
  const [phoneRrror, setPhoneError] = useState("");
  const [phoneSuccess, setPhoneSuccess] = useState("");
  const [apiErr, setApiErr] = useState([]);
  const [phoneVerifiedStatus, setPhoneVerifiedStatus] = useState(false);

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
            token: window.location.pathname?.split("/candidate/verify/")[1],
          }
        );
        if (response?.data?.status) {
          localStorage.setItem("mobile", phone);
          setPhoneSuccess(response?.data?.message);
          setPhoneVerifiedStatus(true);
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
            <div class="preview"></div>
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

      
      <div
        id="static-backdrop-modal-previews"
        class="modal centered overflow-y-auto show mt-0 ml-0 pl-0 z-[10000]"
        tabindex="-1"
        data-tw-backdrop="static"
        aria-hidden="false"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <a data-tw-dismiss="modal" href="javascript:;">
              {" "}
              <i data-lucide="x" class="w-8 h-8 text-slate-400"></i>{" "}
            </a>
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <i
                  data-lucide="check-circle"
                  class="w-16 h-16 text-success mx-auto mt-3"
                ></i>
                <div class="text-3xl mt-5">Confirm Your Interview</div>
              </div>
              <div class="px-5 pb-8 text-center">
                {/* <button
                  type="button"
                  class="btn btn-primary w-24"
                >
                  Ok
                </button> */}
                <button
                  type="sybmit"
                  data-tw-dismiss="modal"
                  className="btn bg-[rgba(13,148,136,1)] text-white w-24 mr-1 mb-2"
                >
                  Yes
                </button>
                <button
                  type="submit"
                  className="btn bg-[rgba(200,0,0,1)] text-white w-24 mr-1 mb-2"
                  data-tw-toggle="modal"
                  data-tw-dismiss="modal"
          data-tw-target="#static-backdrop-modal-preview"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div
        id="static-backdrop-modal-preview"
        class="modal"
        data-tw-backdrop="static"
        tabindex="-1"
        aria-hidden="true"
      >
        {" "}
        <div class="modal-dialog">
          {" "}
          <div class="modal-content">
            {" "}
            <div class="modal-body px-5 py-10">
              {" "}
              <div class="text-center">
                {" "}
                <div class="text-3xl mt-5">Reschedule Your Interview</div>
                <button
                  type="sybmit"
                  data-tw-dismiss="modal"
                  className="btn bg-[rgba(13,148,136,1)] text-white w-24 mr-1 mb-2"
                >
                  Yes
                </button>
                <button
                  type="submit"
                  className="btn bg-[rgba(200,0,0,1)] text-white w-24 mr-1 mb-2"
                  data-tw-dismiss="modal"
                >
                  No
                </button>
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      {/* <!-- END: Modal Content -->  */}

      {/* <!-- END: Dark Mode Switcher--> */}
    </>
  );
}
