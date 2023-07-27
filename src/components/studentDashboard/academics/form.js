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
<<<<<<< Updated upstream
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
=======
  // console.log("userInfo", userInfo?.academic);
  const [newInitialValues, setNewInitialValues] = useState({
    academics: {
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
  });

  const [initialValues, setInitialValues] = useState({
    academics:
    userInfo?.academic?.map((academic, ind) => ({
      institution_name: academic.institution_name || "",
      institution_board: academic.institution_board || "",
      id: academic.id || "",
      stream: academic.stream || "",
      passed_year: academic.passed_year || "",
      total_marks: academic.total_marks || "",
      obtained_marks: academic.obtained_marks || "",
      registration_no: academic.registration_no || "",
      registration_year: academic.registration_year || "",
      city: academic.city || "",
      state: academic.state || "",
      country: academic.country || "",
      zipcode: academic.zipcode || "",
    })),
>>>>>>> Stashed changes
  });


<<<<<<< Updated upstream
  

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
=======
  useEffect(() => {
    // Set default values for academics if userInfo?.academics is undefined or empty
    const defaultAcademics = userInfo?.academics?.length > 0
      ? userInfo?.academics?.map((academic) => ({
          institution_name: academic.institution_name || "",
          institution_board: academic.institution_board || "",
          id: academic.id || "",
          stream: academic.stream || "",
          passed_year: academic.passed_year || "",
          total_marks: academic.total_marks || "",
          obtained_marks: academic.obtained_marks || "",
          registration_no: academic.registration_no || "",
          registration_year: academic.registration_year || "",
          city: academic.city || "",
          state: academic.state || "",
          country: academic.country || "",
          zipcode: academic.zipcode || "",
        }))
      : [newInitialValues.academics];

    setInitialValues({
      academics: defaultAcademics,
    });
  }, [activeTab, userInfo]);
>>>>>>> Stashed changes

  const handleSubmit = async (values) => {
    console.log(values)
    setSuccessMsg("");
    setApiErr([]);
    // Handle form submission here
<<<<<<< Updated upstream
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
=======
    console.log(values);
    const formData = {
      candidate_id: candidate_id,
      dob: values?.dateOfBirth,
      skills: values?.skills,
      mother_name: values?.mothersName,
      father_name: values?.fathersName,
      home_phone: values?.homePhoneNumber,
      place_birth: values?.birthPlace,
      email_code: values?.email,
      citizenship_id: values?.citizenshipId,
      tax_id: values?.taxId,
      passport_id: values?.passportId,
      passport_issued: values?.passportIssuedDate,
      passport_expiry: values?.passportExpiryDate,
      languages_speak: values?.languagesSpeak,
      languages_write: values?.languages,
      blood_group: values?.bloodGroup,
    };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://hrmbackdoor.globalcrmsoftware.com/api/hrm-candidate/academic/store",
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
>>>>>>> Stashed changes
  };

  
  const addAcademicDetail = (setFieldValue) => {
<<<<<<< Updated upstream
    setFieldValue("academics", [...formRef.current.values.academics, { ...initialValues.academics[0] }]);
=======
    setFieldValue("academics", [
      ...formRef.current.values?.academics,
      { ...newInitialValues?.academics[0] },
    ]);
>>>>>>> Stashed changes
    formRef.current.validateForm();
  };

  const removeAcademicDetail = (setFieldValue, index) => {
    const academics = formRef.current.values.academics.slice();
    console.log(academics)
    academics.splice(index+1, 1);
    setFieldValue("academics", academics);
    formRef.current.validateForm();
<<<<<<< Updated upstream
=======
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://hrmbackdoor.globalcrmsoftware.com/api/hrm-candidate/academic/remove",
        { academic_id: id },
        {
          headers: {
            "access-token": token,
          },
        }
      );
      console.log(response.data);

      const academics = formRef.current.values?.academics.slice();
      console.log(academics);
      academics.splice(index + 1, 1);
      setFieldValue("academics", academics);
      formRef.current.validateForm();
    } catch (err) {
      console.log(err);
      setApiErr([err?.response?.data?.errors]);
    }
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              <Form>
                <FieldArray name="academics">
                    {/* {({ remove, push}) =>{ */}
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
=======
          <Form>
            <FieldArray name="academics">
              {/* {({ remove, push}) =>{ */}
              <>
              {console.log(values)}
                {values?.academics?.map((academic, index) => (
                  <>
                    <div className="flex mt-2">
                      <p className=" flex w-full font-bold text-lg text-blue-900">
                        Academic details - {index + 1}
                      </p>
                      <div class="w-full flex justify-end items-baseline ">
                        {index == 0 && (
                          <button
                            class="btn btn-primary shadow-md mr-2"
                            onClick={() => addAcademicDetail(setFieldValue)}
                          >
                            {" "}
                            <AiOutlinePlus className="mr-2" /> Add New Product{" "}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* <a className="text-blue-900 font-bold cursor-pointer"
                     type="button" onClick={() => addAcademicDetail(setFieldValue)}>
                  Add Academic
                </a> */}
                    <div
                      className=" border-2 border-slate-200/60 p-4 mt-2 "
                      key={index}
                    >
                      <div className="grid grid-cols-4 gap-x-5 gap-y-3">
                        <div className="hidden">
                          <Field
                            id={`id${index}`}
                            type="text"
                            className="form-control !none"
                            placeholder="company phone"
                            name={`academics[${index}].id`}
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`academics[${index}].id`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`institution_name_${index}`}
                            className="form-label"
                          >
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
                          <label
                            htmlFor={`institution_board_${index}`}
                            className="form-label"
                          >
                            Institution board
                          </label>
                          <Field
                            id={`institution_board_${index}`}
                            type="text"
                            className="form-control"
                            placeholder="Institution board"
                            name={`academics[${index}].institution_board`}
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`academics[${index}].institution_board`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`stream_${index}`}
                            className="form-label"
                          >
                            Stream
                          </label>
                          <Field
                            id={`stream_${index}`}
                            type="text"
                            name={`academics[${index}].stream`}
                            className="form-control"
                            placeholder="Stream"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`academics[${index}].stream`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`passed_year${index}`}
                            className="form-label"
                          >
                            Passed year
                          </label>
                          <Field
                            id={`passed_year${index}`}
                            type="text"
                            name={`academics[${index}].passed_year`}
                            className="form-control"
                            placeholder="Passed year"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
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
                          <label
                            htmlFor={`total_marks${index}`}
                            className="form-label"
                          >
                            Total marks
                          </label>
                          <Field
                            id={`total_marks${index}`}
                            type="text"
                            name={`academics[${index}].total_marks`}
                            className="form-control"
                            placeholder="Total marks"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`academics[${index}].total_marks`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`obtained_marks${index}`}
                            className="form-label"
                          >
                            Obtained marks
                          </label>
                          <Field
                            id={`obtained_marks${index}`}
                            type="text"
                            name={`academics[${index}].obtained_marks`}
                            className="form-control"
                            placeholder="Obtained marks"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`academics[${index}].obtained_marks`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`registration_no${index}`}
                            className="form-label"
                          >
                            Registration no
                          </label>
                          <Field
                            id={`registration_no${index}`}
                            type="text"
                            name={`academics[${index}].registration_no`}
                            className="form-control"
                            placeholder="Registration no"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
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
                          <label
                            htmlFor={`registration_year${index}`}
                            className="form-label"
                          >
                            Registration year
                          </label>
                          <Field
                            id={`registration_year${index}`}
                            type="text"
                            name={`academics[${index}].registration_year`}
                            className="form-control"
                            placeholder="Registration year"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`academics[${index}].registration_year`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`city${index}`}
                            className="form-label"
                          >
                            City
                          </label>
                          <Field
                            id={`city${index}`}
                            type="text"
                            name={`academics[${index}].city`}
                            className="form-control"
                            placeholder="City"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`academics[${index}].city`}
                            />
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-x-5 gap-y-5 mt-3">
                        <div className="">
                          <label
                            htmlFor={`state${index}`}
                            className="form-label"
                          >
                            State
                          </label>
                          <Field
                            id={`state${index}`}
                            type="text"
                            name={`academics[${index}].state`}
                            className="form-control"
                            placeholder="State"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`academics[${index}].state`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`country${index}`}
                            className="form-label"
                          >
                            Country
                          </label>
                          <Field
                            id={`country${index}`}
                            type="text"
                            name={`academics[${index}].country`}
                            className="form-control"
                            placeholder="Country"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`academics[${index}].country`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`zipcode${index}`}
                            className="form-label"
                          >
                            Zipcode
                          </label>
                          <Field
                            id={`zipcode${index}`}
                            type="text"
                            name={`academics[${index}].zipcode`}
                            className="form-control"
                            placeholder="Zipcode"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`academics[${index}].zipcode`}
                            />
                          </p>
                        </div>
                      </div>
                      {index !== 0 && (
                        <a
                          className=" flex items-baseline text-danger justify-end font-bold cursor-pointer mt-3"
                          type="button"
                          onClick={() =>
                            removeAcademicDetail(
                              setFieldValue,
                              index - 1,
                              userInfo?.academic[index].id
                            )
                          }
                        >
                          <BsTrash3 className="mr-1" /> Delete Academic -{" "}
                          {index + 1}
                        </a>
                      )}
                    </div>
                  </>
>>>>>>> Stashed changes
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

export default AcademicForm;
