import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (
      !name ||
      !phone ||
      !email
    ) {
      setError("All fields are required.");
      return;
    }

    const newUser = {
      name,
      phone,
      email,
      password,
      role: "customer",
    };

    try {
      const response = await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        setError("");
        navigate("/home");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to decrease video opacity */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <Navbar></Navbar>

      {/* Signup Card */}
      <div className="relative flex items-center justify-center h-screen z-10">
        <div className="bg-black/40 backdrop-blur-md shadow-2xl rounded-2xl p-4 w-full max-w-md h-[500px] overflow-y-auto text-white">
          <h2 className="text-3xl font-bold text-center mb-6">Customer Sign Up</h2>

          {error && (
            <p className="text-red-400 text-center mb-4 font-medium">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex flex-col gap-4">
              {/* Full Name */}
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border border-gray-600 bg-transparent rounded-lg px-3 py-2
                             focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-400"
                  required
                />
              </div>
              {/* Email */}
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-600 bg-transparent rounded-lg px-3 py-2
                             focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-400"
                  required
                />
              </div>
              {/* Password */}
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-600 bg-transparent rounded-lg px-3 py-2
                             focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-400"
                  required
                />
              </div>
              {/* Phone Number */}
              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-600 bg-transparent rounded-lg px-3 py-2
                             focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-400"
                  required
                />
              </div>
              {/* Confirm Password */}
              <div>
                <label className="block mb-1 font-medium">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full border border-gray-600 bg-transparent rounded-lg px-3 py-2
                             focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-400"
                  required
                />
              </div>
            </div>
            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition mt-4"
            >
              Sign Up
            </button>
          </form>

          {/* Extra Links */}
          <p className="text-center text-gray-300 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-red-400 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Signup;