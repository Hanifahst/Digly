import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F5F0]">
      <div className="w-full max-w-md rounded-2xl border border-[#E7DDD0] bg-[#FFFDF9] p-8">

        <h1
          className="text-3xl text-[#3E2F26]"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          Welcome Back
        </h1>

        <p className="mt-2 text-sm text-[#6B5B4D]">
          Sign in to continue exploring books
        </p>

        {/* FORM */}
        <form className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-full border border-[#D8CDBF] px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-full border border-[#D8CDBF] px-4 py-3 outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-[#6B4F3A] py-3 text-white hover:bg-[#5A4230]"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-[#6B5B4D]">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#6B4F3A] font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;