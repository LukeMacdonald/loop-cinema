import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { userLogin } from "../data/repository";
import { verifyLogin } from "../data/validation";
import { useAuth } from "../AuthContext";
import BgImg from "../assets/images/bg.png";
import "../styles/styles.css";

function Signin() {
  const { dispatch } = useAuth();

  const [fields, setFields] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const validation = verifyLogin(fields.username, fields.password);
      console.log(validation);
      if (validation.status === true) {
        const response = await userLogin({
          username: fields.username,
          password: fields.password,
        });
        if (response.message === "Login successful") {
          window.alert(response.message);
          dispatch({ type: "LOGIN", payload: fields.username });
          navigate(`/profile/details/${response.user.username}`);
        }
      }
      console.log(validation);
      const temp = { ...fields };
      temp.password = "";
      setFields(temp);
      setErrorMessage(validation.message);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 justify-start items-center">
      <img
        className="fixed left-0 bottom-0"
        src={BgImg}
        width="100%"
        height="100%"
        alt="bg"
        style={{ zIndex: 0 }}
      />
      <div className="pt-20 w-1/3 flex flex-col" style={{ zIndex: 1 }}>
        <h1 className="text-2xl font-bold">Sign Into Your Account</h1>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Username"
            name="username"
            id="username"
            type="text"
            value={fields.username}
            onChange={handleInputChange}
            placeholder="Username"
            required={false}
            className="my-4"
          />
          <FormInput
            label="Password"
            name="password"
            id="password"
            type="password"
            value={fields.password}
            onChange={handleInputChange}
            placeholder="Password"
            required={false}
            className="mb-8"
          />
          <div className="form-group" style={{ textAlign: "center" }}>
            <input
              type="submit"
              className="w-1/2 rounded-md bg-purple-900 py-2 hover:bg-purple-600"
              value="Submit"
              style={{ width: "70%", marginTop: "5%" }}
            />
          </div>
          {errorMessage && (
            <div className="form-group" style={{ marginTop: "1rem" }}>
              <span className="text-danger">{errorMessage}</span>
            </div>
          )}
          <div className={"auth-signup-link"}>
            <p>
              Don't alreadt have an Account?{" "}
              <a href="/signup" className="text-purple-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
