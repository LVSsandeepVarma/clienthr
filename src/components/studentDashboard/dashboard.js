import React, { useEffect, useState, useRef} from "react";
import TomSelect from "tom-select";
import $ from "jquery";
import CreatableSelect from "react-select/creatable";
import BioForm from "./BioDataForm/form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AcademicForm from "./academics/form";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [options, setOptions] = useState([]);
  const [errors, setErrorObj] = useState();
  const [userInfoi, setUserInfo] = useState();
  const containerRef = useRef();
  const navigate = useNavigate()


  useEffect(()=>{

    const fetchUserInfo=async()=>{
      if (containerRef.current && containerRef.current.scrollWidth > containerRef.current.clientWidth) {
        containerRef.current.classList.add('show-tooltip');
      }
      try{
        const accessToken = localStorage.getItem("token")
        const response = await axios.get("https://hrmbackdoor.globalcrmsoftware.com/api/hrm-candidate/get-user-info",{headers: {"access-token":accessToken, "Content-Type":"application/json"}})
        console.log(response?.data)
        if(response?.data?.status){
          setUserInfo(response?.data?.data)
        }else{
          localStorage.removeItem("token");
        navigate("/candidate/verify/EwPZd3Of80yoaUbOqbeTov+&&met&&aUfWQinz4a+MFlWX8Ww=")
        }
        
      }catch(err){
        console.log(err,"err")
        localStorage.removeItem("token");
        navigate("/candidate/verify/EwPZd3Of80yoaUbOqbeTov+&&met&&aUfWQinz4a+MFlWX8Ww=")
        
      }

    }

    fetchUserInfo()
  },[])


  const [items, setItems] = useState([]);
  const handleChange = (items) => {
    console.log(items);
    setItems(items);
  };

  const handleSavePersonalDetails=()=>{
    const values = {};

  }

  return (
    <>
      <div className="flex justify-center container">
        {/* <!-- BEGIN: Content --> */}
        <div className="wrapper">
          {/* <!-- BEGIN: Top Bar --> */}
          <div className="top-bar">
            {/* <!-- BEGIN: Breadcrumb --> */}
            <nav aria-label="breadcrumb" className="-intro-x hidden xl:flex">
              <ol className="breadcrumb breadcrumb-light">
                <li className="breadcrumb-item">
                  <a href="#">Candidate</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Profile</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Dashboard
                </li>
              </ol>
            </nav>
            {/* <!-- END: Breadcrumb --> */}
            {/* <!-- BEGIN: Mobile Menu --> */}
            <div className="-intro-x xl:hidden mr-3 sm:mr-6">
              <div className="mobile-menu-toggler cursor-pointer">
                {" "}
                <i
                  data-lucide="bar-chart-2"
                  className="mobile-menu-toggler__icon transform rotate-90 dark:text-slate-500"
                ></i>{" "}
              </div>
            </div>
            {/* <!-- END: Mobile Menu --> */}
            {/* <!-- BEGIN: Search --> */}
            <div className="intro-x relative ml-auto sm:mx-auto">
              <div className="search hidden sm:block">
                <input
                  type="text"
                  className="search__input form-control"
                  placeholder="Quick Search... (Ctrl+k)"
                />
                <i data-lucide="search" className="search__icon"></i>
              </div>
              <a className="notification sm:hidden" href="">
                {" "}
                <i
                  data-lucide="search"
                  className="notification__icon dark:text-slate-500 mr-5"
                ></i>{" "}
              </a>
            </div>
            {/* <!-- END: Search --> */}
            {/* <!-- BEGIN: Search Result --> */}
            <div
              id="search-result-modal"
              className="modal flex items-center justify-center"
              tabIndex="-1"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-body p-0">
                    <div className="relative border-b border-slate-200/60">
                      <i
                        data-lucide="search"
                        className="w-5 h-5 absolute inset-y-0 my-auto ml-4 text-slate-500"
                      ></i>
                      <input
                        type="text"
                        className="form-control border-0 shadow-none focus:ring-0 py-5 px-12"
                        placeholder="Quick Search..."
                      />
                      <div className="h-6 text-xs bg-slate-200 text-slate-500 px-2 flex items-center rounded-md absolute inset-y-0 right-0 my-auto mr-4">
                        ESC
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="font-medium mb-3">Applications</div>
                      <div className="mb-5">
                        <a
                          href=""
                          className="flex items-center mt-3 first:mt-0"
                        >
                          <div className="w-7 h-7 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full">
                            {" "}
                            <i
                              className="w-3.5 h-3.5"
                              data-lucide="inbox"
                            ></i>{" "}
                          </div>
                          <div className="ml-3 truncate">Compose New Mail</div>
                          <div className="ml-auto w-48 truncate text-slate-500 text-xs flex justify-end items-center">
                            {" "}
                            <i
                              className="w-3.5 h-3.5 mr-2"
                              data-lucide="link"
                            ></i>{" "}
                            Quick Access{" "}
                          </div>
                        </a>
                        <a
                          href=""
                          className="flex items-center mt-3 first:mt-0"
                        >
                          <div className="w-7 h-7 bg-pending/10 text-pending flex items-center justify-center rounded-full">
                            {" "}
                            <i
                              className="w-3.5 h-3.5"
                              data-lucide="users"
                            ></i>{" "}
                          </div>
                          <div className="ml-3 truncate">Contacts</div>
                          <div className="ml-auto w-48 truncate text-slate-500 text-xs flex justify-end items-center">
                            {" "}
                            <i
                              className="w-3.5 h-3.5 mr-2"
                              data-lucide="link"
                            ></i>{" "}
                            Quick Access{" "}
                          </div>
                        </a>
                        <a
                          href=""
                          className="flex items-center mt-3 first:mt-0"
                        >
                          <div className="w-7 h-7 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full">
                            {" "}
                            <i
                              className="w-3.5 h-3.5"
                              data-lucide="credit-card"
                            ></i>{" "}
                          </div>
                          <div className="ml-3 truncate">Product Reports</div>
                          <div className="ml-auto w-48 truncate text-slate-500 text-xs flex justify-end items-center">
                            {" "}
                            <i
                              className="w-3.5 h-3.5 mr-2"
                              data-lucide="link"
                            ></i>{" "}
                            Quick Access{" "}
                          </div>
                        </a>
                      </div>
                      <div className="font-medium mb-3">Contacts</div>
                      <div className="mb-5">
                        <a
                          href=""
                          className="flex items-center mt-3 first:mt-0"
                        >
                          <div className="w-7 h-7 image-fit">
                            <img
                              alt="Rocketman - HTML Admin Template"
                              className="rounded-full"
                              src="dist/images/profile-10.jpg"
                            />
                          </div>
                          <div className="w-36 truncate ml-3">
                            John Travolta
                          </div>
                          <div className="ml-auto w-36 truncate text-slate-500 text-xs text-right">
                            johntravolta@left4code.com
                          </div>
                        </a>
                        <a
                          href=""
                          className="flex items-center mt-3 first:mt-0"
                        >
                          <div className="w-7 h-7 image-fit">
                            <img
                              alt="Rocketman - HTML Admin Template"
                              className="rounded-full"
                              src="dist/images/profile-11.jpg"
                            />
                          </div>
                          <div className="w-36 truncate ml-3">
                            Arnold Schwarzenegger
                          </div>
                          <div className="ml-auto w-36 truncate text-slate-500 text-xs text-right">
                            arnoldschwarzenegger@left4code.com
                          </div>
                        </a>
                        <a
                          href=""
                          className="flex items-center mt-3 first:mt-0"
                        >
                          <div className="w-7 h-7 image-fit">
                            <img
                              alt="Rocketman - HTML Admin Template"
                              className="rounded-full"
                              src="dist/images/profile-7.jpg"
                            />
                          </div>
                          <div className="w-36 truncate ml-3">Johnny Depp</div>
                          <div className="ml-auto w-36 truncate text-slate-500 text-xs text-right">
                            johnnydepp@left4code.com
                          </div>
                        </a>
                        <a
                          href=""
                          className="flex items-center mt-3 first:mt-0"
                        >
                          <div className="w-7 h-7 image-fit">
                            <img
                              alt="Rocketman - HTML Admin Template"
                              className="rounded-full"
                              src="dist/images/profile-2.jpg"
                            />
                          </div>
                          <div className="w-36 truncate ml-3">
                            Leonardo DiCaprio
                          </div>
                          <div className="ml-auto w-36 truncate text-slate-500 text-xs text-right">
                            leonardodicaprio@left4code.com
                          </div>
                        </a>
                      </div>
                      <div className="font-medium mb-3">Products</div>
                      <div>
                        <a
                          href=""
                          className="flex items-center mt-3 first:mt-0"
                        >
                          <div className="w-7 h-7 image-fit">
                            <img
                              alt="Rocketman - HTML Admin Template"
                              className="rounded-full"
                              src="dist/images/preview-7.jpg"
                            />
                          </div>
                          <div className="w-36 truncate ml-3">
                            Samsung Galaxy S20 Ultra
                          </div>
                          <div className="ml-auto w-36 truncate text-slate-500 text-xs text-right">
                            Smartphone &amp; Tablet
                          </div>
                        </a>
                        <a
                          href=""
                          className="flex items-center mt-3 first:mt-0"
                        >
                          <div className="w-7 h-7 image-fit">
                            <img
                              alt="Rocketman - HTML Admin Template"
                              className="rounded-full"
                              src="dist/images/preview-12.jpg"
                            />
                          </div>
                          <div className="w-36 truncate ml-3">
                            Apple MacBook Pro 13
                          </div>
                          <div className="ml-auto w-36 truncate text-slate-500 text-xs text-right">
                            PC &amp; Laptop
                          </div>
                        </a>
                        <a
                          href=""
                          className="flex items-center mt-3 first:mt-0"
                        >
                          <div className="w-7 h-7 image-fit">
                            <img
                              alt="Rocketman - HTML Admin Template"
                              className="rounded-full"
                              src="dist/images/preview-2.jpg"
                            />
                          </div>
                          <div className="w-36 truncate ml-3">
                            Oppo Find X2 Pro
                          </div>
                          <div className="ml-auto w-36 truncate text-slate-500 text-xs text-right">
                            Smartphone &amp; Tablet
                          </div>
                        </a>
                        <a
                          href=""
                          className="flex items-center mt-3 first:mt-0"
                        >
                          <div className="w-7 h-7 image-fit">
                            <img
                              alt="Rocketman - HTML Admin Template"
                              className="rounded-full"
                              src="dist/images/preview-8.jpg"
                            />
                          </div>
                          <div className="w-36 truncate ml-3">
                            Oppo Find X2 Pro
                          </div>
                          <div className="ml-auto w-36 truncate text-slate-500 text-xs text-right">
                            Smartphone &amp; Tablet
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- END: Search Result --> */}
            {/* <!-- BEGIN: Notifications --> */}
            <div className="intro-x dropdown mr-5 sm:mr-6">
              <div
                className="dropdown-toggle notification notification--bullet cursor-pointer"
                role="button"
                aria-expanded="false"
                data-tw-toggle="dropdown"
              >
                {" "}
                <i
                  data-lucide="bell"
                  className="notification__icon dark:text-slate-500"
                ></i>{" "}
              </div>
              <div className="notification-content pt-2 dropdown-menu">
                <div className="notification-content__box dropdown-content">
                  <div className="notification-content__title">
                    Notifications
                  </div>
                  <div className="cursor-pointer relative flex ">
                    <div className="w-10 h-10 flex-none image-fit mr-1">
                      <img
                        alt="Rocketman - HTML Admin Template"
                        className="rounded-full"
                        src="dist/images/profile-10.jpg"
                      />
                      <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                    </div>
                    <div className="ml-2">
                      <a href="javascript:;" className="font-medium mr-1">
                        John Travolta
                      </a>{" "}
                      <span className="text-slate-500">
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical Latin
                        literature from 45 BC, making it over 20
                      </span>
                      <div className="text-xs text-slate-400 mt-1">
                        01:10 PM
                      </div>
                    </div>
                  </div>
                  <div className="cursor-pointer relative flex mt-5">
                    <div className="w-10 h-10 flex-none image-fit mr-1">
                      <img
                        alt="Rocketman - HTML Admin Template"
                        className="rounded-full"
                        src="dist/images/profile-11.jpg"
                      />
                      <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                    </div>
                    <div className="ml-2">
                      <a href="javascript:;" className="font-medium mr-1">
                        Arnold Schwarzenegger
                      </a>{" "}
                      <span className="text-slate-500">
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical Latin
                        literature from 45 BC, making it over 20
                      </span>
                      <div className="text-xs text-slate-400 mt-1">
                        05:09 AM
                      </div>
                    </div>
                  </div>
                  <div className="cursor-pointer relative flex mt-5">
                    <div className="w-10 h-10 flex-none image-fit mr-1">
                      <img
                        alt="Rocketman - HTML Admin Template"
                        className="rounded-full"
                        src="dist/images/profile-7.jpg"
                      />
                      <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                    </div>
                    <div className="ml-2">
                      <a href="javascript:;" className="font-medium mr-1">
                        Johnny Depp
                      </a>{" "}
                      <span className="text-slate-500">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem{" "}
                      </span>
                      <div className="text-xs text-slate-400 mt-1">
                        03:20 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- END: Notifications --> */}
            {/* <!-- BEGIN: Notifications --> */}
            <div className="intro-x mr-auto sm:mr-6">
              <div className="notification cursor-pointer">
                {" "}
                <i
                  data-lucide="inbox"
                  className="notification__icon dark:text-slate-500"
                ></i>{" "}
              </div>
            </div>
            {/* <!-- END: Notifications --> */}
            {/* <!-- BEGIN: Account Menu --> */}
            <div className="intro-x dropdown text-slate-200 h-10">
              <div
                className="h-full dropdown-toggle flex items-center"
                role="button"
                aria-expanded="false"
                data-tw-toggle="dropdown"
              >
                <div className="w-10 h-10 image-fit">
                  <img
                    alt="Rocketman - HTML Admin Template"
                    className="rounded-full border-2 border-white border-opacity-10 shadow-lg"
                    src="dist/images/profile-12.jpg"
                  />
                </div>
                <div className="hidden md:block ml-3">
                  <div className="max-w-[7rem] truncate font-medium">
                    John Travolta
                  </div>
                  <div className="text-xs text-slate-400">
                    Frontend Engineer
                  </div>
                </div>
              </div>
              <div className="dropdown-menu w-56">
                <ul className="dropdown-content">
                  <li>
                    <a href="" className="dropdown-item">
                      {" "}
                      <i data-lucide="user" className="w-4 h-4 mr-2"></i>{" "}
                      Profile{" "}
                    </a>
                  </li>
                  <li>
                    <a href="" className="dropdown-item">
                      {" "}
                      <i data-lucide="edit" className="w-4 h-4 mr-2"></i> Add
                      Account{" "}
                    </a>
                  </li>
                  <li>
                    <a href="" className="dropdown-item">
                      {" "}
                      <i data-lucide="lock" className="w-4 h-4 mr-2"></i> Reset
                      Password{" "}
                    </a>
                  </li>
                  <li>
                    <a href="" className="dropdown-item">
                      {" "}
                      <i
                        data-lucide="help-circle"
                        className="w-4 h-4 mr-2"
                      ></i>{" "}
                      Help{" "}
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a href="" className="dropdown-item">
                      {" "}
                      <i
                        data-lucide="toggle-right"
                        className="w-4 h-4 mr-2"
                      ></i>{" "}
                      Logout{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- END: Account Menu --> */}
          </div>
          {/* <!-- END: Top Bar --> */}
          <div className="content">
            <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
              <h2 className="text-lg font-medium mr-auto">Personal Data</h2>
              {/* <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
                <button className="btn btn-primary shadow-md mr-2">
                  {" "}
                  <i className="w-4 h-4 mr-2" data-lucide="mail"></i> Compose
                  New Mail{" "}
                </button>
                <button className="btn box">
                  {" "}
                  <i className="w-4 h-4 mr-2" data-lucide="settings"></i>{" "}
                  Settings{" "}
                </button>
              </div> */}
            </div>
            <div className="box grid grid-cols-12 mt-5">
              {/* <!-- BEGIN: Inbox Side Menu --> */}
              {/* col-span-12  xl:col-span-4 2xl: */}
              <div className="col-span-12 md:col-span-4 2xl:col-span-3 border-b xl:border-r border-slate-200/60 bg-slate-50 dark:bg-darkmode-600 p-5 rounded-l-md">
                <div className=" nav-tabs !block" role="tablist">
                  <button
                    id="profile"
                    role="tab"
                    data-tw-toggle="pill"
                    data-tw-target="#tab1"
                    aria-controls="tab1"
                    area-selected="true"
                    className={`flex items-center  px-3 py-2 rounded-md ${
                      activeTab == "tab1"
                        ? "bg-primary dark:bg-darkmode-800 font-medium text-white"
                        : ""
                    } `}
                    onClick={() => {
                      setActiveTab("tab1");
                    }}
                  >
                    {" "}
                    {activeTab == "tab1" && (
                      <div className="w-2 h-2 bg-pending rounded-full"></div>
                    )}
                    <i className="w-4 h-4 mr-2" data-lucide="mail"></i> Personal
                    Details{" "}
                  </button>
                  <button
                    id="academics"
                    role="tab"
                    data-tw-toggle="pill"
                    data-tw-target="#tab2"
                    aria-controls="tab2"
                    area-selected="false"
                    href=""
                    className={`flex items-center px-3 py-2 mt-2 rounded-md ${
                      activeTab == "tab2"
                        ? "bg-primary dark:bg-darkmode-800 font-medium text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveTab("tab2");
                    }}
                  >
                    {" "}
                    {activeTab == "tab2" && (
                      <div className="w-2 h-2 bg-pending rounded-full"></div>
                    )}
                    <i
                      className="w-4 h-4 mr-2"
                      onClick={() => {
                        setActiveTab("tab2");
                      }}
                      data-lucide="star"
                    ></i>{" "}
                    Academic Details{" "}
                  </button>
                  <button
                    id="expericence"
                    role="presentation"
                    data-tw-toggle="pill"
                    data-tw-target="tab3"
                    aria-controls="tab3"
                    area-selected="false"
                    href=""
                    className={`flex items-center px-3 py-2 mt-2 rounded-md ${
                      activeTab == "tab3"
                        ? "bg-primary dark:bg-darkmode-800 font-medium text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveTab("tab3");
                    }}
                  >
                    {" "}
                    {activeTab == "tab3" && (
                      <div className="w-2 h-2 bg-pending rounded-full"></div>
                    )}
                    <i className="w-4 h-4 mr-2" data-lucide="inbox"></i>{" "}
                    Professional Experience{" "}
                  </button>
                  <button
                    id="expericence"
                    role="presentation"
                    data-tw-toggle="pill"
                    data-tw-target="tab4"
                    aria-controls="tab4"
                    area-selected="false"
                    href=""
                    className={`flex items-center px-3 py-2 mt-2 rounded-md ${
                      activeTab == "tab4"
                        ? "bg-primary dark:bg-darkmode-800 font-medium text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveTab("tab4");
                    }}
                  >
                    {" "}
                    {activeTab == "tab4" && (
                      <div className="w-2 h-2 bg-pending rounded-full"></div>
                    )}
                    <i className="w-4 h-4 mr-2" data-lucide="inbox"></i> Skills{" "}
                  </button>
                  <button
                    id="ientification"
                    role="presentation"
                    data-tw-toggle="pill"
                    data-tw-target="tab5"
                    aria-controls="tab5"
                    area-selected="false"
                    href=""
                    className={`flex items-center px-3 py-2 mt-2 rounded-md ${
                      activeTab == "tab5"
                        ? "bg-primary dark:bg-darkmode-800 font-medium text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveTab("tab5");
                    }}
                  >
                    {" "}
                    {activeTab == "tab5" && (
                      <div className="w-2 h-2 bg-pending rounded-full"></div>
                    )}
                    <i className="w-4 h-4 mr-2" data-lucide="inbox"></i>{" "}
                    Identification{" "}
                  </button>
                </div>
                <hr className="mt-2"/>
                <div > 
                <div className="flex items-center mt-4"> <i data-lucide="clipboard" className="w-4  h-4 text-slate-500 mr-2"></i> First Name : {userInfoi?.candidate?.fname} </div>
                <div className="flex items-center mt-4"> <i data-lucide="clipboard" className="w-4 h-4 text-slate-500 mr-2"></i> Last-Name : {userInfoi?.candidate?.lname} </div>
                <div className="group" >
                <div className="flex items-center break-all mt-4 " ref={containerRef}> <i data-lucide="clipboard" className="w-4 h-4 !text-sm text-slate-500 mr-2"></i> Email: {userInfoi?.candidate?.email}</div>
                {}
                </div>
                <div className="flex items-center mt-4"> <i data-lucide="clipboard" className="w-4 h-4 text-slate-500 mr-2"></i> Phone Number: {userInfoi?.candidate?.mobile} </div>
                </div>
              </div>
              {/* <!-- END: Inbox Side Menu --> */}
              {/* <!-- BEGIN: Inbox Content --> */}
              <div className="inbox col-span-12 md:col-span-8 2xl:col-span-9 w-full ">
                <div className="tab-content border-l border-r border-b">
                  <div
                    id="tab1"
                    className={`tab-pane leading-relaxed p-5 ${
                      activeTab == "tab1" ? "active" : ""
                    }`}
                    role="tabpanel"
                    aria-labelledby="tab1"
                  >
                      {userInfoi && <BioForm candidateId={userInfoi?.candidate?.id} userInfo={userInfoi} activeTab={activeTab}/>}
                  </div>
                  <div
                    id="tab2"
                    className={`tab-pane leading-relaxed p-5  ${
                      activeTab == "tab2" ? "active" : ""
                    } `}
                    role="tabpanel"
                    aria-labelledby="tab2"
                  >
                    <AcademicForm candidateId={userInfoi?.candidate?.id} activeTab={activeTab}/>
                  </div>
                  <div
                    id="tab3"
                    className={`tab-pane leading-relaxed p-5  ${
                      activeTab == "tab3" ? "active" : ""
                    } `}
                    role="tabpanel"
                    aria-labelledby="tab3"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-3 ">
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    id="tab4"
                    className={`tab-pane leading-relaxed p-5  ${
                      activeTab == "tab4" ? "active" : ""
                    } `}
                    role="tabpanel"
                    aria-labelledby="tab4"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-3 ">
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    id="tab5"
                    className={`tab-pane leading-relaxed p-5   ${
                      activeTab == "tab5" ? "active" : ""
                    } `}
                    role="tabpanel"
                    aria-labelledby="tab5"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-3 ">
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="regular-form-1" className="form-label">
                          Input Text
                        </label>
                        <input
                          id="regular-form-1"
                          type="text"
                          className="form-control"
                          placeholder="Input text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- END: Inbox Content --> */}
              
            </div>
            {/* <div className="!flex w-[100%]" style={{justifyContent:"right", display:"flex"}}>
              <button className="btn btn-primary w-24  mt-2 mb-2 " type="submit" onClick={handleSavePersonalDetails}>
                Save
              </button>{" "}
              </div> */}
          </div>
          
        </div>
        
        {/* <!-- END: Content --> */}
      </div>
    </>
  );
}
