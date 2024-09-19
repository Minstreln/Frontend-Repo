import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconEye,
  IconEyeInvisible,
} from "../../assets/icons/icons";
import { useRef, useState } from "react";

const SignIn = () => {
  const password = useRef(); //ref to togggle passowrd visibility

  const [PwdVisible, setPwdVisible] = useState(false); //state for password visibility

  function DisplayPassword() {
    if (password.current.type == "password") {
      password.current.type = "text";
      setPwdVisible(true);
    } else {
      password.current.type = "password";
      setPwdVisible(false);
    }
  }

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
        <form action="">
          <div className="grid grid-rows-2 gap-4">
            <div className="w-[90%]">
              <input
                type="email"
                required
                placeholder="Email address"
                className="border px-5 py-2 rounded-md text-[17px] w-full"
              />
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
                ref={password}
                placeholder="Password"
                id="password"
                className="border px-5 py-2 rounded-md text-[17px] w-full"
              />
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
            Sign In <IconArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
