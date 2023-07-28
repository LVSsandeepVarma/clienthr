import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import axios from "axios";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

const experienceSchema = Yup.object().shape({
  company_name: Yup.string().required("Company name is required"),
  company_phone: Yup.string()
    .matches(/^[0-9]+$/, "Company phone should contain only numbers")
    .required("Company phone is required"),
  designation: Yup.string().required("Designation is required"),
  from_date: Yup.string().required("From date required"),
  to_date: Yup.string().required("To date required"),
  salary_month: Yup.string().required("Salary monthly required"),
  experience: Yup.string()
    .matches(/^[0-9]+$/, "Registration no should contain only numeric")
    .required("Experience in years required"),
  company_address: Yup.string()
    .matches(
      /^[a-zA-Z ]+$/,
      "Company address should contain only alphanumeric characters"
    )
    .required("Company address required"),
  company_city: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Company city should contain only alphabets")
    .required("Company city required"),
  company_state: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Company state should contain only alphabets")
    .required("Company company_state required"),
  company_country: Yup.string().matches(
    /^[A-Za-z ]+$/,
    "Company company_country should contain only alphabets"
  ),
  company_pincode: Yup.string()
    .matches(/^[0-9]+$/, "Company pincode should contain only numbers")
    .required("Pincode is required"),
  company_email: Yup.string("ivalid company email").required(
    "Company email required"
  ),
});

const validationSchema = Yup.object().shape({
  experience: Yup.array().of(experienceSchema),
  // Add other validation rules for other fields if needed
});

const ExperienceForm = ({ candidate_id, activeTab, userInfo }) => {
  console.log("Experienceform");
  const [successMsg, setSuccessMsg] = useState("");
  const [apiErr, setApiErr] = useState([]);
  console.log("userInfo", userInfo?.academic.length);
  const [newInitialValues, setNewInitialValues] = useState({
    experiences: {
      company_name: "",
      company_phone: "",
      designation: "",
      from_date: "",
      to_date: "",
      salary_month: "",
      experience: "",
      company_address: "",
      company_city: "",
      company_state: "",
      company_country: "",
      company_pincode: "",
      company_email: "",
    },
  });
  const [initialValues, setInitialValues] = useState({
    experiences:
      userInfo?.experience?.length > 0
        ? userInfo?.experience?.map((experience) => ({
            company_name: experience.company_name || "",
            id: experience?.id,
            company_phone: experience.company_phone || "",
            designation: experience.designation || "",
            from_date: experience.from_date || "",
            to_date: experience.to_date || "",
            salary_month: experience.salary_month || "",
            experience: experience.experience || "",
            company_address: experience.company_address || "",
            company_city: experience.company_city || "",
            company_state: experience.company_state || "",
            company_country: experience.company_country || "",
            company_pincode: experience.company_pincode || "",
            company_email: experience.company_email || "",
          }))
        : [newInitialValues?.experiences[0]],
  });

 

  const formRef = React.createRef();

  useEffect(() => {
    setInitialValues({
      experiences:
        userInfo?.experience?.length > 0
          ? userInfo?.experience?.map((experience) => ({
              company_name: experience.company_name || "",
              id: experience.id,
              company_phone: experience.company_phone || "",
              designation: experience.designation || "",
              from_date: experience.from_date?.split(" ")[0] || "",
              to_date: experience.to_date?.split(" ")[0] || "",
              salary_month: experience.salary_month || "",
              experience: experience.experience || "",
              company_address: experience.company_address || "",
              company_city: experience.company_city || "",
              company_state: experience.company_state || "",
              company_country: experience.company_country || "",
              company_pincode: experience.company_pincode || "",
              company_email: experience.company_email || "",
            }))
          : [newInitialValues?.experiences[0]],
    });
  }, [activeTab, userInfo]);

  const handleSubmit = async (values) => {
    console.log(
      values,
      values?.experiences,
      userInfo?.experience.length,
      values?.experiences.slice(userInfo?.experience.length)
    );
    setSuccessMsg("");
    setApiErr([]);
    // // Handle form submission here
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://hrmbackdoor.globalcrmsoftware.com/api/hrm-candidate/experience/store",
        values,
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

  const addAcademicDetail = (setFieldValue) => {
    setFieldValue("expericences", [
      ...formRef.current.values?.experiences,
      { ...newInitialValues?.experiences[0] },
    ]);
    // formRef.current.validateForm();
  };

  const removeAcademicDetail = async (setFieldValue, index, id) => {
    const experiences = formRef?.current?.values?.experiences.slice();
    console.log(experiences);
    console.log(id)
    if(!id){
      experiences.splice(index + 1, 1);
      setFieldValue("experiences", experiences);
    }else if(id){
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://hrmbackdoor.globalcrmsoftware.com/api/hrm-candidate/experience/remove",
        { experience_id: id },
        {
          headers: {
            "access-token": token,
          },
        }
      );
      console.log(response?.data);
      if (response?.data?.status) {
        const fetchUserInfoResponse = await axios.get("");
      }
      experiences.splice(index + 1, 1);
      setFieldValue("experiences", experiences);
      formRef.current.validateForm();
    } catch (err) {
      console.log(err);
      setApiErr([err?.response?.data?.errors]);
    }}
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      // enableReinitialize={true}
      innerRef={formRef}
    >
      {({ values, setFieldValue }) => (
        <>
          <Form>
            <FieldArray name="experiences">
              {/* {({ remove, push}) =>{ */}
              <>
                {values?.experiences?.map((experiences, index) => (
                  <>
                    <div className="flex mt-2">
                      <p className=" flex w-full font-bold text-lg text-blue-900">
                        Experience details - {index + 1}
                      </p>
                      <div class="w-full flex justify-end items-center ">
                        {index == 0 && (
                          <button
                            class="btn btn-primary shadow-md mr-2"
                            onClick={() => addAcademicDetail(setFieldValue)}
                          >
                            
                            <AiOutlinePlus className="mr-2" /> Add New Product
                          </button>
                        )}{" "}
                      </div>
                    </div>
                    <div
                      className="border-2 border-slate-200/60 p-4 mt-2 "
                      key={index}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-5 gap-y-3">
                        <div className="">
                          <label
                            htmlFor={`company_name_${index}`}
                            className="form-label"
                          >
                            Company name
                          </label>
                          <Field
                            id={`company_name_${index}`}
                            type="text"
                            placeholder="company name"
                            name={`experiences.${index}.company_name`}
                            className=" form-control  block mx-auto"
                            data-single-mode="true"
                          />
                          <p className="text-red-800 font-bold">
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`experiences.${index}.company_name`}
                            />
                          </p>
                        </div>
                        <div className="hidden">
                          <Field
                            id={`id${index}`}
                            type="text"
                            className="form-control !none"
                            placeholder="company phone"
                            name={`experiences[${index}]?.id`}
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`experiences[${index}].company_phone`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`company_phone_${index}`}
                            className="form-label"
                          >
                            company phone
                          </label>
                          <Field
                            id={`company_phone_${index}`}
                            type="text"
                            className="form-control"
                            placeholder="company phone"
                            name={`experiences[${index}].company_phone`}
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`experiences[${index}].company_phone`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`designation_${index}`}
                            className="form-label"
                          >
                            Designation
                          </label>
                          <Field
                            id={`designation_${index}`}
                            type="text"
                            name={`experiences[${index}].designation`}
                            className="form-control"
                            placeholder="designation"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`experiences[${index}].designation`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`from_date${index}`}
                            className="form-label"
                          >
                            From
                          </label>
                          <Field
                            id={`from_date${index}`}
                            type="date"
                            name={`experiences[${index}].from_date`}
                            className="form-control"
                            placeholder="From date"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`experiences[${index}].from_date`}
                            />
                          </p>
                        </div>
                      </div>
                      <hr className="mt-2 sm:mt-4  p-1" />

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-3">
                        <div className="">
                          <label
                            htmlFor={`to_date${index}`}
                            className="form-label"
                          >
                            To
                          </label>
                          <Field
                            id={`to_date${index}`}
                            type="date"
                            name={`experiences[${index}].to_date`}
                            className="form-control"
                            placeholder="To date"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`experiences[${index}].to_date`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`salary_month${index}`}
                            className="form-label"
                          >
                            Salary
                          </label>
                          <Field
                            id={`salary_month${index}`}
                            type="text"
                            name={`experiences[${index}].salary_month`}
                            className="form-control"
                            placeholder="Salary per month"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`experiences[${index}].salary_month`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`experiences${index}`}
                            className="form-label"
                          >
                            Expericence
                          </label>
                          <Field
                            id={`experiences${index}`}
                            type="text"
                            name={`experiences[${index}].experience`}
                            className="form-control"
                            placeholder="Expericence in years"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`experiences[${index}].experience`}
                            />
                          </p>
                        </div>
                      </div>
                      <hr className="mt-2 sm:mt-4 p-1" />

                      <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                        <div className="">
                          <label
                            htmlFor={`company_address${index}`}
                            className="form-label"
                          >
                            Company address
                          </label>
                          <Field
                            id={`company_address${index}`}
                            type="text"
                            name={`experiences[${index}].company_address`}
                            className="form-control"
                            placeholder="Company address"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`experiences[${index}].company_address`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`company_city${index}`}
                            className="form-label"
                          >
                            Company city
                          </label>
                          <Field
                            id={`company_city${index}`}
                            type="text"
                            name={`experiences[${index}].company_city`}
                            className="form-control"
                            placeholder="company city"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`experiences[${index}].company_city`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`company_pincode${index}`}
                            className="form-label"
                          >
                            Company pincode
                          </label>
                          <Field
                            id={`company_pincode${index}`}
                            type="text"
                            name={`experiences[${index}].company_pincode`}
                            className="form-control"
                            placeholder="company pincode"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`experiences[${index}].company_pincode`}
                            />
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-x-5 gap-y-5 mt-3">
                        <div className="">
                          <label
                            htmlFor={`company_state${index}`}
                            className="form-label"
                          >
                            Company state
                          </label>
                          <Field
                            id={`company_state${index}`}
                            type="text"
                            name={`experiences[${index}].company_state`}
                            className="form-control"
                            placeholder="company state"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`experiences[${index}].company_state`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`company_country${index}`}
                            className="form-label"
                          >
                            Company country
                          </label>
                          <Field
                            id={`company_country${index}`}
                            type="text"
                            name={`experiences[${index}].company_country`}
                            className="form-control"
                            placeholder="company country"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`experiences[${index}].company_country`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`company_email${index}`}
                            className="form-label"
                          >
                            Company email
                          </label>
                          <Field
                            id={`company_email${index}`}
                            type="text"
                            name={`experiences[${index}].company_email`}
                            className="form-control"
                            placeholder="company email"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`experiences[${index}].company_email`}
                            />
                          </p>
                        </div>
                      </div>
                      {index !== 0 && (
                        <a
                          className=" flex items-center text-danger justify-end font-bold cursor-pointer mt-3"
                          type="button"
                          onClick={() =>
                            removeAcademicDetail(
                              setFieldValue,
                              index - 1,
                              userInfo?.experience[index]?.id ? userInfo?.experience[index]?.id : null
                            )
                          }
                        >
                          <BsTrash3 className="mr-1" /> Delete Experience -{" "}
                          {index + 1}
                        </a>
                      )}
                    </div>
                  </>
                ))}

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
                      return Object?.values(val)?.map((er, ind) => (
                        <p className="font-bold" style={{ color: "red" }}>
                          {er}
                        </p>
                      ));
                    })}
                </div>
                {/* </div> */}
                {/* //   ))} */}
              </>
              {/* //     }
                // } */}
            </FieldArray>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default ExperienceForm;
