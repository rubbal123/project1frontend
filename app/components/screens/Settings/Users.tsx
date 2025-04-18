"use client";
import { useState, useEffect } from "react";
const { toast, ToastContainer } = require("react-toastify");
import api from "@/app/middleware/authMiddleware";
import { API_CONFIG } from "@/config/api";

interface User {
  userId: number;
  roleId: number;
  email: string;
  role: string;
}

export function Users() {
  const [activeUserTab, setActiveUserTab] = useState("displayUser");

  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState(-1);
  const [updateId, setUpdateId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [referralLink, setReferralLink] = useState("");

  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");

  //-----------------------validations-----------------------------------
  const isValid = () => {
    if (email.trim() === "") {
      setEmailError("Email is required");
      return false;
    }
    if (roleId === -1) {
      setRoleError("roleId is required");
      return false;
    }
    return true;
  };

  //--------------------------reset variables--------------------------
  const resetVariables = () => {
    setRoleId(-1);
    setEmail("");
    setUpdateId(0);
  };

  //-----------------------------reset error---------------------------------
  const resetError = () => {
    setEmailError("");
    setRoleError("");
  };

  //---------------------------------get all users-----------------------------------
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await api.post(API_CONFIG.GET_ALL_USER_ORGANISATION, {});

      if (response.data.data && response.data.data.length > 0) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.log("error in fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  //---------------------------------add new users-----------------------------------
  const addUsers = async () => {
    try {
      if (!isValid()) return;
      setProcessing(true);
      const response = await api.post(API_CONFIG.INVITE_USER, {
        email,
        roleId,
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success("Sent Invitation link");
      }

      setTimeout(() => {
        resetVariables();
        resetError();
        setProcessing(false);
        setActiveUserTab("displayUser");
        getUsers();
      }, 600);
    } catch (error) {
      console.log("error in adding users", error);
      toast.error("error in adding users");
      setTimeout(() => {
        setProcessing(false);
      }, 600);
    }
  };

  //---------------------------------------------update users---------------------------------
  const updateUsers = async (updateId: number, roleId: number) => {
    try {
      if (roleId === -1) {
        setRoleError("roleId is required");
        return;
      }
      setProcessing(true);
      const response = await api.post(API_CONFIG.UPDATE_USER_ORGANISATION, {
        userId: updateId,
        roleId,
      });
      toast.success("updated users");

      setTimeout(() => {
        setProcessing(false);
        setActiveUserTab("displayUser");
        resetVariables();
        resetError();
        getUsers();
      }, 600);
    } catch (error) {
      console.log("error in updating users", error);
      toast.error("Lead Type not updated");
      setTimeout(() => {
        setProcessing(false);
      }, 600);
    }
  };
  //---------------------------------------------delete users---------------------------------
  const deleteUsers = async (userId: number) => {
    try {
      setProcessing(true);
      // const response = await api.post(API_CONFIG.Delete_, {
      //   id: leadId,
      // });
      toast.success("deleted users");
      setTimeout(() => {
        setProcessing(false);
        getUsers();
      }, 600);
    } catch (error) {
      console.log("error in deleting users", error);
      toast.error("Lead Type not deleted");
      setTimeout(() => {
        setProcessing(false);
      }, 600);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {/*-----------------------------display users-----------------------------*/}
      {activeUserTab === "displayUser" && (
        <div className="border rounded-lg shadow-md p-8 w-full max-w-md mx-4">
          <h2 className="text-2xl font-semibold mb-4">
            {" "}
            Users{" "}
            <button
              onClick={() => setActiveUserTab("addUser")}
              className="mt-6 ml-19  hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded text-base"
              style={{ border: "1px solid black " }}
            >
              Add User
            </button>
          </h2>
          <ToastContainer />
          <h1 className="font-semibold">
            email
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; role
            <hr></hr>
          </h1>

          {users.length > 0 ? (
            users.map((user: User) => (
              <div key={user.userId}>
                {user.email}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {user.role}
                <br></br>
                {processing ? (
                  <button className="mt-6 bg-yellow-400  text-black font-semibold py-2 px-4 rounded">
                    wait...
                  </button>
                ) : (
                  <span>
                    <button
                      onClick={() => deleteUsers(user.userId)}
                      className="m-2 bg-yellow-100 hover:bg-yellow-500 text-black font-semibold py-2 px-1 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setUpdateId(user.userId);
                        setRoleId(user.roleId);
                        setActiveUserTab("updateUser");
                      }}
                      className="mt-2 bg-yellow-100 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                    <hr></hr>
                  </span>
                )}
              </div>
            ))
          ) : (
            <div>No Users found</div>
          )}
        </div>
      )}

      {/*-----------------------------Update users-----------------------------*/}
      {activeUserTab === "updateUser" && (
        <div className="border rounded-lg shadow-md p-8 w-full max-w-md mx-4 my-4">
          <h2 className="text-2xl font-semibold mb-4">
            {" "}
            Update User{" "}
            <button
              onClick={() => {
                resetVariables();
                resetError();
                setActiveUserTab("displayUser");
              }}
              className="mt-6 ml-19  hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded text-base"
              style={{ border: "1px solid black " }}
            >
              cancel
            </button>
          </h2>
          <ToastContainer />

          <div>
            <div>user id: {updateId}</div>
            <label className="block text-sm font-medium text-gray-700">
              User Role
            </label>
            <select
              id="roleId"
              value={roleId}
              onChange={(e) => setRoleId(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="1">admin</option>
              <option value="2">manager</option>
              <option value="3">employee</option>
            </select>
          </div>

          {processing ? (
            <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded w-full">
              wait...
            </button>
          ) : (
            <button
              onClick={() => {
                updateUsers(updateId, roleId);
              }}
              className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded w-full"
            >
              Update User
            </button>
          )}
        </div>
      )}

      {/*-----------------------------Add users-----------------------------*/}
      {activeUserTab === "addUser" && (
        <div className="border rounded-lg shadow-md p-8 w-full max-w-md mx-4 my-4">
          <h2 className="text-2xl font-semibold mb-4">
            {" "}
            Add User{" "}
            <button
              onClick={() => {
                resetVariables();
                resetError();
                setActiveUserTab("displayUser");
              }}
              className="mt-6 ml-19  hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded text-base"
              style={{ border: "1px solid black " }}
            >
              cancel
            </button>
          </h2>
          <ToastContainer />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              role
            </label>
            <select
              id="roleId"
              value={roleId}
              onChange={(e) => setRoleId(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option>select option</option>
              <option value="2">manager</option>
              <option value="1">admin</option>
              <option value="3">employee</option>
            </select>
            {roleError && <p className="text-red-500 text-sm">{roleError}</p>}
          </div>
          <div>{referralLink && <div>referral link: {referralLink}</div>}</div>

          {processing ? (
            <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded w-full">
              wait...
            </button>
          ) : (
            <button
              onClick={addUsers}
              className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded w-full"
            >
              Add User
            </button>
          )}
        </div>
      )}
    </div>
  );
}
