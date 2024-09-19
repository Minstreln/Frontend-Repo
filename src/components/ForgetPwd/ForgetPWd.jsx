import { Link } from "react-router-dom";
import { IconArrowRight } from "../../assets/icons/icons";

const ForgetPWd = () => {
  return (
    <div className="w-[500px] mx-auto my-20">
      <h1 className="text-[25px] font-medium mb-3">Forget Password</h1>
      <h3 className="text-[15px] text-gray-600 mb-2">
        Go back to{" "}
        <Link to="/signIn" className="text-primary font-semibold">
          Sign In
        </Link>
      </h3>
      <h3 className="text-[15px] text-gray-600 mb-10">
        Don&apos;t have an account?{" "}
        <Link to="/signUp" className="text-primary font-semibold">
          Create Account
        </Link>
      </h3>

      <form action="">
        <input
          type="email"
          placeholder="Email address"
          className="border px-5 py-2 rounded-md text-[17px] w-full"
        />
        <button className="flex items-center justify-center gap-4 w-full bg-primary rounded-md py-3 mt-5 text-white">
          Reset Password <IconArrowRight />
        </button>
      </form>
    </div>
  );
};

export default ForgetPWd;
