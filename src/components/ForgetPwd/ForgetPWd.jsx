import { Link } from "react-router-dom";
import { IconArrowRight } from "../../assets/icons/icons";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const ForgetPWd = () => {
  const [email, setEmail] = useState('');
  const { forgotPassword } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await forgotPassword(email);
      console.log('Reset successful! You can now log in.');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="sm:w-[600px] w-[90%] mx-auto my-20">
      <h1 className="sm:text-[25px] text-[20px] font-medium mb-3">Forget Password</h1>
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

      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={()=> setEmail(event.target.value)}
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
