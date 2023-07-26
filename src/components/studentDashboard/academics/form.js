import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import axios from "axios";

const validationSchema = Yup.object().shape({
    institution_name: Yup.string().required("Institution name required"),
    institution_board: Yup.string()
    .matches(/^[A-Za-z]+$/, "Institution board should contain only alphabets")
    .required("Institution board required"),
  //   phoneCode: Yup.string().required("Phone Code is required"),

  stream: Yup.string().required("Stream is required"),
  passed_year: Yup.string()
    .required("Passed year required"),
    total_marks: Yup.string().required("total marks required"),
    obtained_marks: Yup.string()
    .required("Obtained marks required"),
    registration_no: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Registration no should contain only alphabets")
    .required("Registration no required"),
    registration_year: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Registration year should contain only alphanumeric characters"
    )
    .required("Citizenship number required"),
    city: Yup.string()
    .matches(
        /^[A-Za-z]+$/,
        "City  should contain only alphabets"
    )
    .required("Tax number required"),
    state: Yup.string()
    .matches(
        /^[A-Za-z]+$/,
        "State  should contain only alphabets"
    )
    .required("Passport number required"),
    country: Yup.array().of(
    Yup.string().matches(
      /^[A-Za-z]+$/,
      "Country  should contain only alphabets"
    )
  ),
  zipcode: Yup.array().of(
    Yup.string().matches(
      /^[0-9]+$/,
      "Zipcode should contain only numbers"
    )
  ),
});



const AcademicForm = ({ candidate_id, activeTab, userInfo }) => {
  console.log("Academicsform")
  const [items, setItems] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [apiErr, setApiErr] = useState([]);
  console.log(userInfo)
  const [initialValues, setInitialValues] = useState({
    academics: [
      {
        institution_name: "",
        institution_board: "",
        stream: "",
        passed_year: "",
        total_marks: "",
        obtained_marks: "",
        registration_no: "",
        registration_year: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
      },
    ],
  });


  

    const formRef = React.createRef();

    useEffect(() => {
        setInitialValues({
          academics: [
            {
              institution_name: `${userInfo?.academics?.institution_name || ""}`,
              institution_board: `${userInfo?.academics?.institution_board || ""}`,
              stream: `${userInfo?.academics?.stream || ""}`,
              passed_year: `${userInfo?.academics?.passed_year || ""}`,
              total_marks: `${userInfo?.academics?.total_marks || ""}`,
              obtained_marks: `${userInfo?.academics?.obtained_marks || ""}`,
              registration_no: `${userInfo?.academics?.registration_no || ""}`,
              registration_year: `${userInfo?.academics?.registrastion_year || ""}`,
              city: `${userInfo?.academics?.city || ""}`,
              state: `${userInfo?.academics?.state || ""}`,
              country: `${userInfo?.academics?.country || ""}`,
              zipcode: `${userInfo?.academics?.zipcode || ""}`,
            },
          ],
        });
      }, [activeTab]);

  const handleSubmit = async (values) => {
    console.log(values)
    setSuccessMsg("");
    setApiErr([]);
    // Handle form submission here
    // console.log(values);
    // const formData = {
    //   candidate_id: candidate_id,
    //   dob: values.dateOfBirth,
    //   skills: values.skills,
    //   mother_name:values.mothersName,
    //   father_name: values.fathersName,
    //   home_phone: values.homePhoneNumber,
    //   place_birth: values.birthPlace,
    //   email_code: values?.email,
    //   citizenship_id: values?.citizenshipId,
    //   tax_id: values?.taxId,
    //   passport_id: values?.passportId,
    //   passport_issued: values?.passportIssuedDate,
    //   passport_expiry: values?.passportExpiryDate,
    //   languages_speak: values?.languagesSpeak,
    //   languages_write: values?.languages,
    //   blood_group: values.bloodGroup,
    // };
    // const token = localStorage.getItem("token");
    // try {
    //   const response = await axios.post(
    //     "https://hrmbackdoor.globalcrmsoftware.com/api/hrm-candidate/biodata/store",
    //     formData,
    //     {
    //       headers: {
    //         "access-token": token,
    //       },
    //     }
    //   );
    //   if (response?.data?.status) {
    //     console.log(response?.data);
    //     setSuccessMsg(response?.data?.message);
    //   } else {
    //     console.log(response?.data);
    //     if (response?.data?.errors) {
    //       setApiErr([response?.data?.errors]);
    //     } else {
    //       setApiErr([{ token: response?.data?.message }]);
    //     }
    //   }
    // } catch (err) {
    //   console.log(err);
    //   if (err?.response?.data?.errors) {
    //     setApiErr([err?.response?.data?.errors]);
    //   } else {
    //     setApiErr([{ token: err?.response?.data?.message }]);
    //   }
    // }
  };

  
  const addAcademicDetail = (setFieldValue) => {
    setFieldValue("academics", [...formRef.current.values.academics, { ...initialValues.academics[0] }]);
    formRef.current.validateForm();
  };

  const removeAcademicDetail = (setFieldValue, index) => {
    const academics = formRef.current.values.academics.slice();
    console.log(academics)
    academics.splice(index+1, 1);
    setFieldValue("academics", academics);
    formRef.current.validateForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      innerRef={formRef}
    >
      {({values, resetForm, setFieldValue})=>(
        <>
              <Form>
                <FieldArray name="academics">
                    {/* {({insert, remove, push}) =>{ */}
                        <>
                        {values.academics.map((academic, index) => (
              <div key={index}>
                <div className="grid grid-cols-4 gap-x-5 gap-y-3">
                  <div className="">
                    <label htmlFor={`institution_name_${index}`} className="form-label">
                      Institution name
                    </label>
                    <Field
                    id={`institution_name_${index}`}
                      type="text"
                      placeholder="Institution name"
                      name={`academics.${index}.institution_name`}
                      className=" form-control  block mx-auto"
                      data-single-mode="true"
      
                    />
                    <p className="text-red-800 font-bold">
                      <ErrorMessage
                        className="!text-red-600 font-bold"
                        name={`academics.${index}.institution_name`}
                      />
                    </p>
                  </div>
                  <div className="">
                    <label htmlFor={`institution_board_${index}`} className="form-label">
                    Institution board
                    </label>
                    <Field
                      id={`institution_board_${index}`}
                      type="text"
                      className="form-control"
                      placeholder="Institution board"
                      name={`academics[${index}].institution_board`}
                    />
                    <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                      <ErrorMessage
                        className="!text-red-600 font-bold"
                        name={`academics[${index}].institution_board`}
                      />
                    </p>
                  </div>
                  <div className="">
                    <label htmlFor={`stream_${index}`} className="form-label">
                      Stream
                    </label>
                    <Field
                      id={`stream_${index}`}
                      type="text"
                      name={`academics[${index}].stream`}
                      className="form-control"
                      placeholder="Stream"
                    />
                    <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                      <ErrorMessage
                        className="!text-red-600 font-bold"
                        name={`academics[${index}].stream`}
                      />
                    </p>
                  </div>
                  <div className="">
                    <label htmlFor={`passed_year${index}`} className="form-label">
                      Passed year
                    </label>
                    <Field
                      id={`passed_year${index}`}
                      type="text"
                      name={`academics[${index}].passed_year`}
                      className="form-control"
                      placeholder="Passed year"
                    />
                    <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                      <ErrorMessage
                        className="!text-red-600 font-bold"
                        name={`academics[${index}].passed_year`}
                      />
                    </p>
                  </div>
                </div>
                <hr className="mt-2 sm:mt-4  p-1" />
      
                <div className="grid grid-cols-3 gap-x-5 gap-y-3">
                  <div className="">
                    <label htmlFor={`total_marks${index}`} className="form-label">
                      Total marks
                    </label>
                    <Field
                      id={`total_marks${index}`}
                      type="text"
                      name={`academics[${index}].total_marks`}
                      className="form-control"
                      placeholder="Total marks"
                    />
                    <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                      <ErrorMessage
                        className="!text-red-600 font-bold"
                        name={`academics[${index}].total_marks`}
                      />
                    </p>
                  </div>
                  <div className="">
                    <label htmlFor={`obtained_marks${index}`} className="form-label">
                      Obtained marks
                    </label>
                    <Field
                      id={`obtained_marks${index}`}
                      type="text"
                      name={`academics[${index}].obtained_marks`}
                      className="form-control"
                      placeholder="Obtained marks"
                    />
                    <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                      <ErrorMessage
                        className="!text-red-600 font-bold"
                        name={`academics[${index}].obtained_marks`}
                      />
                    </p>
                  </div>
                  <div className="">
                    <label htmlFor={`registration_no${index}`} className="form-label">
                      Registration no
                    </label>
                    <Field
                      id={`registration_no${index}`}
                      type="text"
                      name={`academics[${index}].registration_no`}
                      className="form-control"
                      placeholder="Registration no"
                    />
                    <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                      <ErrorMessage
                        className="!text-red-600 font-bold"
                        name={`academics[${index}].registration_no`}
                      />
                    </p>
                  </div>
                </div>
                <hr className="mt-2 sm:mt-4 p-1" />
      
                <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                  <div className="">
                    <label htmlFor={`registration_year${index}`} className="form-label">
                      Registration year
                    </label>
                    <Field
                      id={`registration_year${index}`}
                      type="text"
                      name={`academics[${index}].registration_year`}
                      className="form-control"
                      placeholder="Registration year"
                    />
                    <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                      <ErrorMessage
                        className="!text-red-600 font-bold"
                        name={`academics[${index}].registration_year`}
                      />
                    </p>
                  </div>
                  <div className="">
                    <label htmlFor={`city${index}`} className="form-label">
                      City
                    </label>
                    <Field
                      id={`city${index}`}
                      type="text"
                      name={`academics[${index}].city`}
                      className="form-control"
                      placeholder="City"
                    />
                    <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                      <ErrorMessage
                        className="!text-red-600 font-bold"
                        name={`academics[${index}].city`}
                      />
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-x-5 gap-y-5 mt-3">
                  <div className="">
                    <label htmlFor={`state${index}`} className="form-label">
                      State
                    </label>
                    <Field
                      id={`state${index}`}
                      type="text"
                      name={`academics[${index}].state`}
                      className="form-control"
                      placeholder="State"
                    />
                    <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                      <ErrorMessage
                        className="!text-red-600 font-bold"
                        name={`academics[${index}].state`}
                      />
                    </p>
                  </div>
                  <div className="">
                    <label htmlFor={`country${index}`} className="form-label">
                      Country
                    </label>
                    <Field
                      id={`country${index}`}
                      type="text"
                      name={`academics[${index}].country`}
                      className="form-control"
                      placeholder="Country"
                    />
                    <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                      <ErrorMessage
                        className="!text-red-600 font-bold"
                        name={`academics[${index}].country`}
                      />
                    </p>
                  </div>
                  <div className="">
                    <label htmlFor={`zipcode${index}`} className="form-label">
                      Zipcode
                    </label>
                    <Field
                      id={`zipcode${index}`}
                      type="text"
                      name={`academics[${index}].zipcode`}
                      className="form-control"
                      placeholder="Zipcode"
                    />
                    <p className="!text-red-800 font-bold" style={{ color: "red" }}>
                      <ErrorMessage
                        className="!text-red-600 font-bold"
                        name={`academics[${index}].zipcode`}
                      />
                    </p>
                  </div>
                </div>
                {index !==0 && <button type="button" onClick={()=> removeAcademicDetail(setFieldValue, index-1)}
                >
                      Delete Academic
                    </button>}
                  </div>
                ))}
                <button type="button" onClick={() => addAcademicDetail(setFieldValue)}>
                  Add Academic
                </button>
                
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
                  {successMsg && <p className="text-green-600 font-bold">{successMsg}</p>}
                  {apiErr?.length > 0 &&
                    apiErr?.map((val, ind) => {
                      return Object?.values(val).map((er, ind) => (
                        <p className="font-bold" style={{ color: "red" }}>
                          {er}
                        </p>
                      ));
                    })}
                </div>
              {/* </div> */}
            {/* //   ))} */}
              </>
            {/* //   }} */}
              </FieldArray>
            </Form>
        </>
      )}

    </Formik>
  );
};

export default AcademicForm;
