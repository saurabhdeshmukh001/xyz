import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5001/users");

      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }

      const users = await response.json();

      const user = users.find(
        (u) => u.email === email && u.role === role
      );

      if (user && user.password === password) {
        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(user));
        if (role === "customer") {
          navigate("/home");
        } else if (role === "seller") {
          navigate("/admin");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("An error occurred. Please try again later.");
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
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div> {/* Adjust opacity-50 for desired darkness */}

      <Navbar></Navbar>

      {/* Login Card */}
      <div className="relative flex items-center justify-center h-screen z-10">
        <div className="bg-black/40 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-sm text-white">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          {error && (
            <p className="text-red-400 text-center mb-4 font-medium">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Dropdown */}
            <div>
              <label className="block mb-2 font-medium">Select Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-600 bg-transparent rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="customer" className="text-black">
                  Customer
                </option>
                <option value="seller" className="text-black">
                  Seller
                </option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-600 bg-transparent rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-600 bg-transparent rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none placeholder-gray-400"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
            >
              Login
            </button>
          </form>

          {/* Extra Links */}
          {role === "customer" && (
            <p className="text-center text-gray-300 mt-6">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-red-400 font-medium cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;