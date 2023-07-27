import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import axios from "axios";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

const addressSchema = Yup.object().shape({
  street_1: Yup.string().required("Street 1 is required"),
  street_2: Yup.string(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State required"),
  pincode: Yup.string().required("Pincode required"),
  country: Yup.string().required("Country required"),
  address_type: Yup.string().required("Address Type required"),
});

const validationSchema = Yup.object().shape({
  address: Yup.array().of(addressSchema),
  // Add other validation rules for other fields if needed
});

const AddressForm = ({ candidate_id, activeTab, userInfo }) => {
  console.log("Addressform");
  const [successMsg, setSuccessMsg] = useState("");
  const [apiErr, setApiErr] = useState([]);
  console.log("userInfo", userInfo?.address);
  const newInitialValues = {
    address: {
      street_2: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      address_type: "",
    },
  };
  const [initialValues, setInitialValues] = useState({
    address:
      userInfo?.address?.map((addr) => ({
        street_1: addr.street_1 || "",
        street_2: addr.street_2 || "",
        id: addr.id || "",
        city: addr.city || "",
        state: addr.state || "",
        pincode: addr.pincode || "",
        country: addr.country || "",
        address_type: addr.address_type || "",
      })) || [],
  });

  const formRef = React.createRef();

  useEffect(() => {
    setInitialValues({
      address:
        userInfo?.address?.map((addr) => ({
          street_1: addr.street_1 || "",
          street_2: addr.street_2 || "",
          id: addr.id || "",
          city: addr.city || "",
          state: addr.state || "",
          pincode: addr.pincode || "",
          country: addr.country || "",
          address_type: addr.address_type || "",
        })) || [],
    });
  }, [activeTab]);

  const handleSubmit = async (values) => {
    console.log(values);
    setSuccessMsg("");
    setApiErr([]);
    // // Handle form submission here
    console.log(values);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://hrmbackdoor.globalcrmsoftware.com/api/hrm-candidate/address/store",
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
    setFieldValue("address", [
      ...formRef.current.values.address,
      { ...newInitialValues.address[0] },
    ]);
    formRef.current.validateForm();
  };

  const removeAcademicDetail = async (setFieldValue, index, id) => {
    const address = formRef.current.values.address.slice();
    console.log(address);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://hrmbackdoor.globalcrmsoftware.com/api/hrm-candidate/address/remove",
        { address_id: id },
        {
          headers: {
            "access-token": token,
          },
        }
      );
      console.log(response.data);
      address.splice(index + 1, 1);
      setFieldValue("address", address);
      formRef.current.validateForm();
    } catch (err) {
      console.log(err);
      setApiErr([err?.response?.data?.errors]);
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
      {({ values, resetForm, setFieldValue }) => (
        <>
          <Form>
            <FieldArray name="address">
              {/* {({ remove, push}) =>{ */}
              <>
                {values.address.map((address, index) => (
                  <>
                    <div className="flex mt-2">
                      <p className=" flex w-full font-bold text-lg text-blue-900">
                        Address details - {index + 1}
                      </p>
                      <div class="w-full flex justify-end items-center ">
                        {index == 0 && (
                          <button
                            class="btn btn-primary shadow-md mr-2"
                            onClick={() => addAcademicDetail(setFieldValue)}
                          >
                            {" "}
                            <AiOutlinePlus className="mr-2" /> Add New Product{" "}
                          </button>
                        )}{" "}
                      </div>
                    </div>
                    <div
                      className="border-2 border-slate-200/60 p-4 mt-2 "
                      key={index}
                    >
                      <div className="grid grid-cols-4 gap-x-5 gap-y-3">
                        <div className="">
                          <label
                            htmlFor={`street_1_${index}`}
                            className="form-label"
                          >
                            Address lane 1
                          </label>
                          <Field
                            id={`street_1_${index}`}
                            type="text"
                            placeholder="Address lane 1"
                            name={`address.${index}.street_1`}
                            className=" form-control  block mx-auto"
                            data-single-mode="true"
                          />
                          <p className="text-red-800 font-bold">
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`address.${index}.street_1`}
                            />
                          </p>
                        </div>
                        <div className="hidden">
                          <Field
                            id={`id${index}`}
                            type="text"
                            className="form-control !none"
                            placeholder="id"
                            name={`address[${index}].id`}
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`address[${index}].company_phone`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`street_2_${index}`}
                            className="form-label"
                          >
                            Address lane 2
                          </label>
                          <Field
                            id={`street_2_${index}`}
                            type="text"
                            className="form-control"
                            placeholder="Address lane 2"
                            name={`address[${index}].street_2`}
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`address[${index}].street_2`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`city_${index}`}
                            className="form-label"
                          >
                            City
                          </label>
                          <Field
                            id={`city_${index}`}
                            type="text"
                            name={`address[${index}].city`}
                            className="form-control"
                            placeholder="city"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`address[${index}].city`}
                            />
                          </p>
                        </div>
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
                            name={`address[${index}].state`}
                            className="form-control"
                            placeholder="state"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`address[${index}].state`}
                            />
                          </p>
                        </div>
                      </div>
                      <hr className="mt-2 sm:mt-4  p-1" />

                      <div className="grid grid-cols-3 gap-x-5 gap-y-3">
                        <div className="">
                          <label
                            htmlFor={`pincode${index}`}
                            className="form-label"
                          >
                            Pincode
                          </label>
                          <Field
                            id={`pincode${index}`}
                            type="text"
                            name={`address[${index}].pincode`}
                            className="form-control"
                            placeholder="Pincode"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`address[${index}].pincode`}
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
                            name={`address[${index}].country`}
                            className="form-control"
                            placeholder="country"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`address[${index}].country`}
                            />
                          </p>
                        </div>
                        <div className="">
                          <label
                            htmlFor={`address_type${index}`}
                            className="form-label"
                          >
                            Address type
                          </label>
                          <Field
                            id={`address_type${index}`}
                            type="text"
                            name={`address[${index}].address_type`}
                            className="form-control"
                            placeholder="Address type"
                          />
                          <p
                            className="!text-red-800 font-bold"
                            style={{ color: "red" }}
                          >
                            <ErrorMessage
                              className="!text-red-600 font-bold"
                              name={`address[${index}].address_type`}
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
                              userInfo.address[index].id
                            )
                          }
                        >
                          <BsTrash3 className="mr-1" /> Delete Address -{" "}
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
              {/* //     }
                // } */}
            </FieldArray>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default AddressForm;
