import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  IconArrowRight,
  IconEye,
  IconEyeInvisible,
} from "../../assets/icons/icons";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const SignIn = () => {
  const pwd = useRef(); //ref to togggle passowrd visibility
  const [PwdVisible, setPwdVisible] = useState(false); //state for password visibility
  const { login } = useAuth(); //get login function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState(false); // state for email validation
  const [pwdIsInvalid, setPwdIsInvalid] = useState(false); //state for password validation
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || "/";

  function DisplayPassword() {
    if (pwd.current.type == "password") {
      pwd.current.type = "text";
      setPwdVisible(true);
    } else {
      pwd.current.type = "password";
      setPwdVisible(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validating input
    const emailIsValid =
      email.includes("@gmail.com") ||
      email.includes("@yahoo.com") ||
      email == "";
    const pwdIsValid = password.length >= 8;

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    } else if (!pwdIsValid) {
      setPwdIsInvalid(true);
      return;
    }

    try {
      setLoading(true);
      await login.mutateAsync({ email, password }); // Use login from useAuth

      toast.success("Login successful!");
      navigate(redirectPath, { replace: true });
    } catch (err) {
      toast.error(err);
      console.log("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[600px] mx-auto my-20">
      <h1 className="text-[25px] font-medium mb-3">Sign In</h1>
      <h3 className="text-[15px] text-gray-600 mb-10">
        Don&apos;t have an account?{" "}
        <Link to="/signUp" className="text-primary font-semibold">
          Create Account
        </Link>
      </h3>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div className="grid grid-rows-2 gap-4">
            <div className="w-[90%]">
              <input
                type="email"
                value={email}
                onChange={() => setEmail(event.target.value)}
                required
                placeholder="Email address"
                className="border px-5 py-2 rounded-md text-[17px] w-full"
              />
              <div className="text-red-400">
                {emailIsInvalid && <p>Please enter a valid email address</p>}
              </div>
            </div>
            <div className="w-[90%] relative">
              <div
                className="absolute top-3 right-5 cursor-pointer text-[20px]"
                onClick={DisplayPassword}
              >
                {PwdVisible ? <IconEyeInvisible /> : <IconEye />}
              </div>
              <input
                type="password"
                name="pwd"
                required
                ref={pwd}
                value={password}
                onChange={() => setPassword(event.target.value)}
                placeholder="Password"
                id="password"
                className="border px-5 py-2 rounded-md text-[17px] w-full"
              />
              <div className="text-red-400">
                {pwdIsInvalid && (
                  <p>password must not be less than 8 characters</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-[90%] mt-6">
            <div>
              <input type="checkbox" name="" id="checkbox" />
              <label
                htmlFor="checkbox"
                className="text-[15px] text-gray-500 ml-2"
              >
                Remember Me
              </label>
            </div>
            <Link to="/forget-password" className="text-primary font-semibold">
              Forgot Password
            </Link>
          </div>
          <button className="flex items-center justify-center gap-4 w-[90%] bg-primary rounded-md py-3 mt-5 text-white">
            {loading ? (
              <div className="flex items-center">
                <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full" />
                Signing In
              </div>
            ) : (
              <span className="flex items-center gap-2 font-medium">
                <span>Sign In</span> <IconArrowRight className="h-4 w-4" />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
