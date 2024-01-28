import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { verifySignUp } from "../data/validation";
import { createUser } from "../data/repository";
import { useAuth } from "../AuthContext";
import BgImg from "../assets/images/bg.png";
function Signup() {
  const { dispatch } = useAuth();

  const [fields, setFields] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    const verified = verifySignUp(
      fields.email,
      fields.password,
      fields.confirmPassword,
      fields.name,
      fields.username,
    );

    console.log(verified.message);

    try {
      if (verified.success) {
        const response = await createUser({
          username: fields.username,
          password: fields.password,
          name: fields.name,
          email: fields.email,
        });
        window.alert("Account created successfully!");
        dispatch({ type: "LOGIN", payload: response.username });
        navigate(`/profile/details/${response.username}`);
        setErrorMessage(null);
      } else {
        const temp = { ...fields };
        temp.password = "";
        temp.confirmPassword = "";
        setFields(temp);
        setErrorMessage(verified.message);
      }
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
        <h1 className="text-2xl font-bold pb-3">Create your account</h1>
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
            label="Name"
            name="name"
            id="name"
            type="text"
            value={fields.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="my-4"
            required={false}
          />
          <FormInput
            label="Email"
            name="email"
            id="email"
            type="text"
            value={fields.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="my-4"
            required={false}
          />
          <div className="flex justify-between items-center">
            <FormInput
              label="Password"
              name="password"
              id="password"
              type="password"
              value={fields.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="my-2 !w-[50%] mr-2"
              required={false}
            />
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              value={fields.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="my-2 !w-[50%] ml-2"
              required={false}
            />
          </div>
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
              Already have an Account?{" "}
              <a href="/signin" className="text-purple-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
