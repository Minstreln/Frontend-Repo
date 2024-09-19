import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconBxBuildings,
  IconBxUserCircle,
  IconEye,
  IconEyeInvisible,
} from "../../assets/icons/icons";
import { useRef, useState } from "react";

const SignUp = () => {
  const password = useRef(); //ref to togggle passowrd visibility
  const confirmPwd = useRef(); //ref to togggle confrimpassowrd visibility
//   const[active, setActive]

  const [PwdVisible, setPwdVisible] = useState(false); //state for password visibility
  const [CPwdVisible, setCPwdVisible] = useState(false); //state for confirmpassword visibility
  //state for input values
  const [values, setvalues] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPwd: "",
  });

  //two way binding of input fields
  function handleInputChange(identifier, value) {
    setvalues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  function DisplayPassword() {
    if (password.current.type == "password") {
      password.current.type = "text";
      setPwdVisible(true);
    } else {
      password.current.type = "password";
      setPwdVisible(false);
    }
  }
  function DisplayConfirmPwd() {
    if (confirmPwd.current.type == "password") {
      confirmPwd.current.type = "text";
      setCPwdVisible(true);
    } else {
      confirmPwd.current.type = "password";
      setCPwdVisible(false);
    }
  }
  return (
    <div className="w-[500px] mx-auto my-20">
      <h1 className="text-[25px] font-medium mb-3">Create Account</h1>
      <h3 className="text-[15px] text-gray-600 mb-10">
        Already have an account?{" "}
        <Link to="/signIn" className="text-primary font-semibold">
          Log In
        </Link>
      </h3>

      <div className="w-full bg-gray-300 rounded-md px-3 py-4 mb-8">
        <h1 className="text-center uppercase text-sm">Create Account As a</h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <button className="rounded-md py-3 text-white w-full flex items-center gap-2 justify-center bg-blue-950"><IconBxUserCircle className="text-[24px]"/> Candidate</button>
          <button className="rounded-md py-3 w-full flex items-center gap-2 justify-center"><IconBxBuildings className="text-[24px]"/> Employers</button>
        </div>
      </div>

      <div>
        <form action="">
          <div className="grid grid-cols-2 w-full mb-3 gap-3">
            <input
              required
              type="text"
              placeholder="Full Name"
              className="border px-5 py-2 rounded-md text-[17px]"
              value={values.fullName}
              onChange={() => handleInputChange("fullName", event.target.value)}
            />
            <input
              required
              type="text"
              placeholder="Username"
              value={values.userName}
              onChange={() => handleInputChange("userName", event.target.value)}
              className="border px-5 py-2 rounded-md text-[17px]"
            />
          </div>
          <div className="grid grid-rows-3 gap-3 mb-5">
            <div className="w-full">
              <input
                required
                type="email"
                placeholder="Email address"
                value={values.email}
                onChange={() => handleInputChange("email", event.target.value)}
                className="border px-5 py-2 rounded-md text-[17px] w-full"
              />
            </div>
            <div className="w-full relative">
              <div
                className="absolute top-3 right-5 cursor-pointer text-[20px]"
                onClick={DisplayPassword}
              >
                {PwdVisible ? <IconEyeInvisible /> : <IconEye />}
              </div>
              <input
                required
                type="password"
                name="pwd"
                placeholder="Password"
                ref={password}
                value={values.password}
                onChange={() =>
                  handleInputChange("password", event.target.value)
                }
                className="border px-5 py-2 rounded-md text-[17px] w-full"
              />
            </div>
            <div className="w-full relative">
              <div
                className="absolute top-3 right-5 cursor-pointer text-[20px]"
                onClick={DisplayConfirmPwd}
              >
                {CPwdVisible ? <IconEyeInvisible /> : <IconEye />}
              </div>
              <input
                required
                type="password"
                ref={confirmPwd}
                value={values.confirmPwd}
                name="confirmPwd"
                placeholder="Confirm Password"
                onChange={() =>
                  handleInputChange("confirmPwd", event.target.value)
                }
                className="border px-5 py-2 rounded-md text-[17px] w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input required type="checkbox" name="" id="check" />
            <label htmlFor="check">
              I&apos;ve read and agree with your Terms of Services
            </label>
          </div>
          <button className="flex items-center justify-center gap-4 w-full bg-primary rounded-md py-3 mt-5 text-white">
            Create Account <IconArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
