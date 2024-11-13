import { Link, useNavigate } from "react-router-dom";
import {
  IconArrowRight,
  IconBxBuildings,
  IconBxUserCircle,
  IconEye,
  IconEyeInvisible,
} from "../../assets/icons/icons";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const password = useRef(); //ref to togggle passowrd visibility
  const confirmPwd = useRef(); //ref to togggle confrimpassowrd visibility
  const terms = useRef();
  const { register } = useAuth(); // Get register function

  const [PwdVisible, setPwdVisible] = useState(false); //state for password visibility
  const [CPwdVisible, setCPwdVisible] = useState(false); //state for confirmpassword visibility

  const [emailIsInvalid, setEmailIsInvalid] = useState(false); // state for email validation
  const [pwdIsInvalid, setPwdIsInvalid] = useState(false); //state for password validation
  const [CPwdIsInvalid, setCPwdIsInvalid] = useState(false); //state for password validation

  const [opt, setOpt] = useState(true);
  const [active, setActive] = useState(true);

  const [loading, setLoading] = useState(false);

  // for navigation
  const navigate = useNavigate();

  function handleCandidate() {
    setActive(true);
    setOpt(true);
  }
  function handleEmployer() {
    setActive(false);
    setOpt(false);
  }

  //state for input values
  const [values, setvalues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    terms: false,
    email: "",
    password: "",
    passwordConfirm: "",
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
  //check if terms and conditions is checked
  function CheckTerms() {
    if (terms.current.checked) {
      setvalues({ ...values, terms: true });
    } else {
      setvalues({ ...values, terms: false });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(values);
    //validating input
    const emailIsValid =
      values.email.includes("@gmail.com") ||
      values.email.includes("@yahoo.com") ||
      values.email == "";
    const pwdIsValid = values.password.length >= 8;

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    } else if (!pwdIsValid) {
      setPwdIsInvalid(true);
      return;
    } else if (values.passwordConfirm !== values.password) {
      setCPwdIsInvalid(true);
      return;
    }

    try {
      setLoading(true);
      await register({ ...values, isJobSeeker: opt }); // Use register from useAuth

      toast.success("Registration successful!");
      setLoading(false);
      navigate("/signin", { replace: true });

      //clear fields
      setvalues({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        terms: false,
        email: "",
        password: "",
        passwordConfirm: "",
      });
      //clear passsword statee
      setCPwdVisible(false);
      setPwdVisible(false);
      //clear error
      setCPwdIsInvalid(false);
      setEmailIsInvalid(false);
      setPwdIsInvalid(false);
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:w-[600px] w-[90%] mx-auto my-20">
      <h1 className="sm:text-[25px] text-[20px] font-medium mb-3">Create Account</h1>
      <h3 className="text-[15px] text-gray-600 mb-10">
        Already have an account?{" "}
        <Link to="/signIn" className="text-primary font-semibold">
          Log In
        </Link>
      </h3>

      <div className="w-full bg-gray-300 rounded-md px-3 py-4 mb-8">
        <h1 className="text-center uppercase text-sm">Create Account As a</h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <button
            onClick={handleCandidate}
            className={
              active
                ? "rounded-md py-3 text-white w-full flex items-center gap-2 justify-center bg-blue-950"
                : "rounded-md py-3 w-full flex items-center gap-2 justify-center"
            }
          >
            <IconBxUserCircle className="text-[24px]" /> Candidate
          </button>
          <button
            onClick={handleEmployer}
            className={
              active
                ? "rounded-md py-3 w-full flex items-center gap-2 justify-center"
                : "rounded-md py-3 text-white w-full flex items-center gap-2 justify-center bg-blue-950"
            }
          >
            <IconBxBuildings className="text-[24px]" /> Employers
          </button>
        </div>
      </div>

      <div>
        <form action="" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 w-full mb-3 gap-3">
            <input
              required
              type="text"
              placeholder="First Name"
              className="border px-5 py-2 rounded-md text-[17px]"
              value={values.firstName}
              onChange={() =>
                handleInputChange("firstName", event.target.value)
              }
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              value={values.lastName}
              onChange={() => handleInputChange("lastName", event.target.value)}
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
              <div className="text-red-400">
                {emailIsInvalid && <p>Please enter a valid email address</p>}
              </div>
            </div>

            <div className="w-full">
              <input
                required
                type="number"
                placeholder="Phone No"
                value={values.phoneNumber}
                onChange={() =>
                  handleInputChange("phoneNumber", event.target.value)
                }
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
              <div className="text-red-400">
                {pwdIsInvalid && (
                  <p>password must not be less than 8 characters</p>
                )}
              </div>
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
                value={values.passwordConfirm}
                name="passwordConfirm"
                placeholder="Confirm Password"
                onChange={() =>
                  handleInputChange("passwordConfirm", event.target.value)
                }
                className="border px-5 py-2 rounded-md text-[17px] w-full"
              />
              <div className="text-red-400">
                {CPwdIsInvalid && <p>password must be the same</p>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              required
              type="checkbox"
              onChange={CheckTerms}
              ref={terms}
              name=""
              id="check"
            />
            <label htmlFor="check">
              I&apos;ve read and agree with your Terms of Services
            </label>
          </div>
          <button className="flex items-center justify-center gap-4 w-full bg-primary rounded-md py-3 mt-5 text-white">
            {loading ? (
              <div className="flex items-center">
                <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full" />
                Creating Account
              </div>
            ) : (
              <span className="flex items-center gap-2 font-medium">
                <span>Create Account</span>
                <IconArrowRight className="h-4 w-4" />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
