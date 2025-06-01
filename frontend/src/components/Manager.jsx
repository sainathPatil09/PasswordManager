import React from "react";
import { useRef, useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const envType = import.meta.env.VITE_REACT_APP_ENV_TYPE;
  console.log(envType)
  console.log(import.meta.env.VITE_REACT_APP_API_URL)
  
  const apiUrl = envType === "Production" ? import.meta.env.VITE_REACT_APP_API_URL : "http://localhost:3000";
  
  console.log(apiUrl)
  const ref = useRef();
  const passwordRef = useRef();
  const initialState = { site: "", username: "", password: "" };
  const [form, setForm] = useState(initialState);
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch(`/api`);
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
    console.log("Calling--")
  }, []);

  const handletoogleEye = () => {
    // alert("change eye")
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "password";
    }
  };

  const copyText = (text) => {
    // alert("copid to clipbord" + text)
    // toast("🦄 Copied to clipbord", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
    alert("Copied to clipboard: ");
    navigator.clipboard.writeText(text);
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.password.length > 3 &&
      form.username.length > 3
    ) {
      await fetch(`/api`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch(`/api`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
      // console.log([...passwordArray, form])
      setForm(initialState);

      // toast("🦄 Password saved", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
      alert("Password saved successfully");
    } else {
      toast("Error : Password not saved");
    }
  };

  const deletePassword = async (id) => {
    if (confirm("Are you sure want to delete password") === true) {
      console.log("deleting password" + id);
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch(`/api`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id !== id)))

      // toast("🦄 Password Deleted", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
      alert("Password deleted successfully");
    }
    // console.log([...passwordArray, form])
  };
  const editPassword = (id) => {
    console.log("editing password" + id);
    setForm({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    // setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
    // localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
    // console.log([...passwordArray, form])
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      /> */}
      {/* Same as */}
      {/* <ToastContainer /> */}

      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div> */}

      <div className=" mx-auto md:mycontainer">
        <div className="logoOut text-center">
          <div className="logo text-4xl font-bold">
            <span className="text-green-600">&lt;</span>
            Pass
            <span className="text-green-600">OP/&gt;</span>
          </div>
          <p className="text-green-800">Your own Password Manager</p>
        </div>

        <div className="flex flex-col p-4 gap-4 items-center ">
          <input
            value={form.site}
            onChange={handleChange}
            className=" w-full border border-green-400 p-1 rounded-full "
            placeholder="Enter website URL"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex md:flex-row flex-col md:gap-12 gap-4 w-full relative ">
            <input
              value={form.username}
              onChange={handleChange}
              className=" border border-green-400 p-1 rounded-full w-full"
              placeholder="Enter user name"
              type="text"
              name="username"
              id="username"
            />

            <input
              ref={passwordRef}
              value={form.password}
              onChange={handleChange}
              className=" border border-green-400 p-1 rounded-full md:w-1/2 "
              placeholder="Enter password"
              type="password"
              name="password"
              id="password"
            />
            <span className="absolute right-3 top-1" onClick={handletoogleEye}>
              <img
                ref={ref}
                className="text-black cursor-pointer"
                width={25}
                src="icons/eyecross.png"
                alt="eye"
              />
            </span>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-500 rounded-full p-2 w-fit gap-2 font-bold hover:bg-green-400 "
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="text-xl font-bold">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden ">
              <thead className="bg-green-700 ">
                <tr>
                  <th className="p-1">Site</th>
                  <th className="p-1">UserName</th>
                  <th className="p-1">Password</th>
                  <th className="p-1">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      {/* <td className='text-center w-32 p-1 border border-white'><a href={item.site} target='_blank'>{item.site}</a>
                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>

                                        </td> */}
                      {/* <td className='text-center w-32 p-1 border border-white'>{item.username}</td>
                                        <td className='text-center w-32 p-1 border border-white'>{item.password}</td> */}
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border border-white text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
