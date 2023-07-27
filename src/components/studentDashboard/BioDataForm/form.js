import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import axios from "axios";

const validationSchema = Yup.object().shape({
  dateOfBirth: Yup.date().required("date of birth required"),
  birthPlace: Yup.string()
    .matches(/^[A-Za-z]+$/, "Birth place should contain only alphabets")
    .required("birth place required"),
  //   phoneCode: Yup.string().required("Phone Code is required"),
  phoneNumber: Yup.string()
    .min(7, "Phone Number should have at least 7 characters")
    .max(15, "Phone Number should have at most 15 characters"),
  //   homePhoneCode: Yup.string(),
  homePhoneNumber: Yup.string()
    .min(7, "Phone Number should have at least 7 characters")
    .max(15, "Phone Number should have at most 15 characters")
    .required("HOme phone required"),
  bloodGroup: Yup.string(),
  skills: Yup.array().of(
    Yup.string().matches(/^[A-Za-z]+$/, "Skills should contain only alphabets")
  ),
  mothersName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Mother's Name should contain only alphabets")
    .required("Mother name required"),
  fathersName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Father's name should contain only alphabets")
    .required("Father name required"),
  citizenshipId: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Citizenship ID should contain only alphanumeric characters"
    )
    .required("Citizenship number required"),
  taxId: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Tax ID should contain only alphanumeric characters"
    )
    .required("Tax number required"),
  passportId: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Passport ID should contain only alphanumeric characters"
    )
    .required("Passport number required"),
  passportIssuedDate: Yup.date(),
  passportExpiryDate: Yup.date(),
  languagesSpeak: Yup.array().of(
    Yup.string().matches(
      /^[A-Za-z]+$/,
      "Languages Speak should contain only alphabets"
    )
  ),
  languages: Yup.array().of(
    Yup.string().matches(
      /^[A-Za-z]+$/,
      "Languages should contain only alphabets"
    )
  ),
});

const TagsField = ({ field, form }) => {
  const handleChange = (tags) => {
    form.setFieldValue(field?.name, tags);
  };
  return <TagsInput value={field?.value} onChange={handleChange} />;
};

const LangSpeakField = ({ field, form }) => {
  const handleChange = (tags) => {
    form.setFieldValue(field?.name, tags);
  };
  return <TagsInput value={field?.value} onChange={handleChange} />;
};
const LangKnownField = ({ field, form }) => {
  const handleChange = (tags) => {
    form.setFieldValue(field?.name, tags);
  };
  return <TagsInput value={field?.value} onChange={handleChange} />;
};

// let initialValues = {
//   dateOfBirth: "",
//   birthPlace: "",
//   phoneCode: "",
//   phoneNumber: "",
//   homePhoneCode: "",
//   homePhoneNumber: "",
//   bloodGroup: "",
//   skills: [],
//   mothersName: "",
//   fathersName: "",
//   citizenshipId: "",
//   taxId: "",
//   passportId: "",
//   passportIssuedDate: "",
//   passportExpiryDate: "",
//   languagesSpeak: [],
//   languages: [],
// };

const BioForm = ({ candidate_id, activeTab, userInfo }) => {
  console.log("bioform");
  const [items, setItems] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [apiErr, setApiErr] = useState([]);
  console.log(userInfo);
  const [initialValues, setInitialValues] = useState({
    dateOfBirth: `${userInfo?.biodata?.dob ? userInfo?.biodata?.dob : ""}`,
    id: `${userInfo?.biodata?.id ? userInfo?.biodata?.id : null}`,
    birthPlace: `${
      userInfo?.biodata?.place_birth ? userInfo?.biodata?.place_birth : ""
    }`,
    phoneCode: "",
    phoneNumber: `${
      userInfo?.candidate?.mobile ? userInfo?.candidate?.mobile : ""
    }`,
    homePhoneCode: "",
    homePhoneNumber: `${
      userInfo?.biodata?.home_phone ? userInfo?.biodata?.home_phone : ""
    }`,
    bloodGroup: `${
      userInfo?.biodata?.blood_group ? userInfo?.biodata?.blood_group : ""
    }`,
    skills: userInfo?.biodata?.skills ? [userInfo?.biodata?.skills] : [],
    mothersName: `${
      userInfo?.biodata?.mother_name ? userInfo?.biodata?.mother_name : ""
    }`,
    fathersName: `${
      userInfo?.biodata?.father_name ? userInfo?.biodata?.father_name : ""
    }`,
    citizenshipId: `${
      userInfo?.biodata?.citizenship_id ? userInfo?.biodata?.citizenship_id : ""
    }`,
    taxId: `${userInfo?.biodata?.tax_id ? userInfo?.biodata?.tax_id : ""}`,
    passportId: `${
      userInfo?.biodata?.passport_id ? userInfo?.biodata?.passport_id : ""
    }`,
    passportIssuedDate: `${
      userInfo?.biodata?.passport_issued
        ? userInfo?.biodata?.passport_issued
        : ""
    }`,
    passportExpiryDate: `${
      userInfo?.biodata?.passport_expiry
        ? userInfo?.biodata?.passport_expiry
        : ""
    }`,
    languagesSpeak: userInfo?.biodata?.languages_speak
      ? [userInfo?.biodata?.languages_speak]
      : [],
    languages: userInfo?.biodata?.languages_write
      ? [userInfo?.biodata?.languages_write]
      : [],
  });

  const formRef = React.createRef();

  useEffect(() => {
    // Reset the Formik form whenever the active tab changes
    // formRef.current?.resetForm(initialValues);
    setInitialValues({
      dateOfBirth: `${userInfo?.biodata?.dob ? userInfo?.biodata?.dob : ""}`,
      birthPlace: `${
        userInfo?.biodata?.place_birth ? userInfo?.biodata?.place_birth : ""
      }`,
      id: `${userInfo?.biodata?.id ? userInfo?.biodata?.id : null}`,
      phoneCode: "",
      phoneNumber: `${
        userInfo?.candidate?.mobile ? userInfo?.candidate?.mobile : ""
      }`,
      homePhoneCode: "",
      homePhoneNumber: `${
        userInfo?.biodata?.home_phone ? userInfo?.biodata?.home_phone : ""
      }`,
      bloodGroup: `${
        userInfo?.biodata?.blood_group ? userInfo?.biodata?.blood_group : ""
      }`,
      skills: userInfo?.biodata?.skills ? [userInfo?.biodata?.skills] : [],
      mothersName: `${
        userInfo?.biodata?.mother_name ? userInfo?.biodata?.mother_name : ""
      }`,
      fathersName: `${
        userInfo?.biodata?.father_name ? userInfo?.biodata?.father_name : ""
      }`,
      citizenshipId: `${
        userInfo?.biodata?.citizenship_id
          ? userInfo?.biodata?.citizenship_id
          : ""
      }`,
      taxId: `${userInfo?.biodata?.tax_id ? userInfo?.biodata?.tax_id : ""}`,
      passportId: `${
        userInfo?.biodata?.passport_id ? userInfo?.biodata?.passport_id : ""
      }`,
      passportIssuedDate: `${
        userInfo?.biodata?.passport_issued
          ? userInfo?.biodata?.passport_issued
          : ""
      }`,
      passportExpiryDate: `${
        userInfo?.biodata?.passport_expiry
          ? userInfo?.biodata?.passport_expiry
          : ""
      }`,
      languagesSpeak: userInfo?.biodata?.languages_speak
        ? [userInfo?.biodata?.languages_speak]
        : [],
      languages: userInfo?.biodata?.languages_write
        ? [userInfo?.biodata?.languages_write]
        : [],
    });
  }, [activeTab]);

  const handleChange = (items) => {
    console.log(items);
    setItems(items);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    setSuccessMsg("");
    setApiErr([]);
    // Handle form submission here
    // console.log(values);
    const formData = {
      candidate_id: candidate_id,
      dob: values.dateOfBirth,
      skills: values.skills,
      id:values.id,
      mother_name: values.mothersName,
      father_name: values.fathersName,
      home_phone: values.homePhoneNumber,
      place_birth: values.birthPlace,
      email_code: values?.email,
      citizenship_id: values?.citizenshipId,
      tax_id: values?.taxId,
      passport_id: values?.passportId,
      passport_issued: values?.passportIssuedDate,
      passport_expiry: values?.passportExpiryDate,
      languages_speak: values?.languagesSpeak,
      languages_write: values?.languages,
      blood_group: values.bloodGroup,
    };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://hrmbackdoor.globalcrmsoftware.com/api/hrm-candidate/biodata/store",
        formData,
        {
          headers: {
            "access-token": token,
          },
        }
      );
      if (response?.data?.status) {
        console.log(response?.data);
        setSuccessMsg(response?.data?.message);
      } else {
        console.log(response?.data);
        if (response?.data?.errors) {
          setApiErr([response?.data?.errors]);
        } else {
          setApiErr([{ token: response?.data?.message }]);
        }
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.errors) {
        setApiErr([err?.response?.data?.errors]);
      } else {
        setApiErr([{ token: err?.response?.data?.message }]);
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      innerRef={formRef}
    >
      {({ values, resetForm }) => (
        <Form>
          <div className="  ">
            <div className="grid grid-cols-4 gap-x-5 gap-y-3">
              <div className="">
                <label htmlFor="regular-form-1" className="form-label">
                  Date of Birth
                </label>
                <Field
                  type="date"
                  name="dateOfBirth"
                  className="datepicker form-control  block mx-auto"
                  data-single-mode="true"
                />
                <p className="text-red-800 font-bold">
                  <ErrorMessage
                    className="!text-red-600 font-bold"
                    name="dateOfBirth"
                  />
                </p>
              </div>
              <div className="hidden">
                
                <Field
                  id="regular-form-1"
                  type="text"
                  className="form-control"
                  placeholder="Enter your birth place"
                  name="id"
                />
                <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                  <ErrorMessage
                    className="!text-red-600 font-bold"
                    name="id"
                  />
                </p>
              </div>
              <div className="">
                <label htmlFor="regular-form-1" className="form-label">
                  Birth Place
                </label>
                <Field
                  id="regular-form-1"
                  type="text"
                  className="form-control"
                  placeholder="Enter your birth place"
                  name="birthPlace"
                />
                <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                  <ErrorMessage
                    className="!text-red-600 font-bold"
                    name="birthPlace"
                  />
                </p>
              </div>
              <div className="">
                <label htmlFor="regular-form-1" className="form-label">
                  Blood group
                </label>
                <Field
                  id="regular-form-1"
                  type="text"
                  name="bloodGroup"
                  className="form-control"
                  placeholder="Enter your blood group"
                />
                <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                  <ErrorMessage
                    className="!text-red-600 font-bold"
                    name="bloodGroup"
                  />
                </p>
              </div>
              <div className="">
                <label htmlFor="regular-form-1" className="form-label">
                  Phone number
                </label>
                <Field
                  id="regular-form-1"
                  type="text"
                  name="phoneNumber"
                  className="form-control"
                  placeholder="Enter your phone number"
                />
                <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                  <ErrorMessage
                    className="!text-red-600 font-bold"
                    name="phoneNumber"
                  />
                </p>
              </div>
            </div>
            <hr className="mt-2 sm:mt-4  p-1" />

            <div className="grid grid-cols-3 gap-x-5 gap-y-3">
              <div className="">
                <label htmlFor="regular-form-1" className="form-label">
                  Father's name
                </label>
                <Field
                  id="regular-form-1"
                  type="text"
                  name="fathersName"
                  className="form-control"
                  placeholder="Enter your Father's name"
                />
                <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                  <ErrorMessage
                    className="!text-red-600 font-bold"
                    name="fathersName"
                  />
                </p>
              </div>
              <div className="">
                <label htmlFor="regular-form-1" className="form-label">
                  Mother's name
                </label>
                <Field
                  id="regular-form-1"
                  type="text"
                  name="mothersName"
                  className="form-control"
                  placeholder="Enter your Mother's name"
                />
                <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                  <ErrorMessage
                    className="!text-red-600 font-bold"
                    name="mothersName"
                  />
                </p>
              </div>
              <div className="">
                <label htmlFor="regular-form-1" className="form-label">
                  Home phone number
                </label>
                <Field
                  id="regular-form-1"
                  type="text"
                  name="homePhoneNumber"
                  className="form-control"
                  placeholder="enter your home phone number"
                />
                <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                  <ErrorMessage
                    className="!text-red-600 font-bold"
                    name="homePhoneNumber"
                  />
                </p>
              </div>
            </div>
            <hr className="mt-2 sm:mt-4 p-1" />

            <div className="grid grid-cols-3 gap-x-6 gap-y-5">
              <div className="">
                <label htmlFor="regular-form-1" className="form-label">
                  Citizebship Id
                </label>
                <Field
                  id="regular-form-1"
                  type="text"
                  name="citizenshipId"
                  className="form-control"
                  placeholder="Enter your Citizenship Id"
                />
                <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                  <ErrorMessage
                    className="!text-red-600 font-bold"
                    name="citizenshipId"
                  />
                </p>
              </div>
              <div className="">
                <label htmlFor="regular-form-1" className="form-label">
                  Tax Id
                </label>
                <Field
                  id="regular-form-1"
                  type="text"
                  name="taxId"
                  className="form-control"
                  placeholder="Enter your Tax Id"
                />
                <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                  <ErrorMessage
                    className="!text-red-600 font-bold"
                    name="taxId"
                  />
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-5 mt-3">
              <div className="">
                <label htmlFor="regular-form-1" className="form-label">
                  Passport Id
                </label>
                <Field
                  id="regular-form-1"
                  type="text"
                  name="passportId"
                  className="form-control"
                  placeholder="Passport Id"
                />
                <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                  <ErrorMessage
                    className="!text-red-600 font-bold"
                    name="passportId"
                  />
                </p>
              </div>
              <div className="">
                <label htmlFor="regular-form-1" className="form-label">
                  Passport Issued
                </label>
                <Field
                  id="regular-form-1"
                  type="date"
                  name="passportIssuedDate"
                  className="form-control"
                  placeholder="Passport issued Date"
                />
                <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                  <ErrorMessage
                    className="!text-red-600 font-bold"
                    name="passportIssuedDate"
                  />
                </p>
              </div>
              <div className="">
                <label htmlFor="regular-form-1" className="form-label">
                  Passport Expiry
                </label>
                <Field
                  id="regular-form-1"
                  type="date"
                  name="passportExpiryDate"
                  className="form-control"
                  placeholder="Passport expiry date"
                />
                <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                  <ErrorMessage
                    className="!text-red-600 font-bold"
                    name="passportExpiryDate"
                  />
                </p>
              </div>
            </div>
            <hr className="mt-2 sm:mt-4 p-1" />

            <div className="">
              <label htmlFor="regular-form-1" className="form-label">
                skills
              </label>
              <Field name="skills" component={TagsField} />
              <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                <ErrorMessage
                  className="!text-red-600 font-bold"
                  name="skills"
                />
              </p>
            </div>

            <div className="">
              <label htmlFor="regular-form-1" className="form-label">
                Languages Speak
              </label>
              <Field name="languagesSpeak" component={LangSpeakField} />
              <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                <ErrorMessage
                  className="!text-red-600 font-bold"
                  name="languagesSpeak"
                />
              </p>
            </div>
            <div className="">
              <label htmlFor="regular-form-1" className="form-label">
                Languages write
              </label>
              <Field name="languages" component={LangKnownField} />
              <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                <ErrorMessage
                  className="!text-red-600 font-bold"
                  name="languages"
                />
              </p>
            </div>

            <div
              className="!flex w-[100%]"
              style={{ justifyContent: "right", display: "flex" }}
            >
              <button
                className="btn w-24 text-white  mt-2 mb-2 "
                style={{ background: "#001756" }}
                type="submit"
              >
                Save
              </button>{" "}
            </div>
            <div className="mt-3 text-center">
              {successMsg && (
                <p className="text-green-600 font-bold">{successMsg}</p>
              )}
              {apiErr?.length > 0 &&
                apiErr?.map((val, ind) => {
                  return Object?.values(val).map((er, ind) => (
                    <p className="font-bold" style={{ color: "red" }}>
                      {er}
                    </p>
                  ));
                })}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BioForm;
