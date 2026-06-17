import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F5F0]">
      <div className="w-full max-w-md rounded-2xl border border-[#E7DDD0] bg-[#FFFDF9] p-8">

        <h1
          className="text-3xl text-[#3E2F26]"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          Create Account
        </h1>

        <p className="mt-2 text-sm text-[#6B5B4D]">
          Join Digly and start reading
        </p>

        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-full border border-[#D8CDBF] px-4 py-3 outline-none focus:border-[#8B6F47]"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-full border border-[#D8CDBF] px-4 py-3 outline-none focus:border-[#8B6F47]"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-full border border-[#D8CDBF] px-4 py-3 outline-none focus:border-[#8B6F47]"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-[#6B4F3A] py-3 text-white hover:bg-[#5A4230]"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-[#6B5B4D]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#6B4F3A] font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;