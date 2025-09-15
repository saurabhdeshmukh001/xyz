import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";
  const isCartPage = location.pathname === "/cart";

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Loaded user from localStorage:", parsedUser);
      setUser(parsedUser);
    } else {
      setUser(null);
    }
  }, [location]);

  if (isLoginPage) {
    return (
      <nav className="absolute top-0 w-full flex justify-between items-center px-10 py-4 text-white z-20 bg-black">
        <Link to="/">
          <h1 className="text-2xl font-bold">Sneako</h1>
        </Link>
      </nav>
    );
  }

  return (
    <nav className="absolute top-0 w-full flex justify-between items-center px-10 py-4 text-white z-20 bg-black">
      <Link to="/">
        <h1 className="text-2xl font-bold">Sneako</h1>
      </Link>

      {user && (user.role === "admin" || user.role === "seller") && (
        <div className="flex items-center space-x-8">
          <Link to="/add-product" className="hover:underline">Add Product</Link>
          {!isCartPage && (
            <div className="relative group cursor-pointer">
              <span className="hover:underline">Categories</span>
              <div className="absolute left-0 mt-0 w-48 bg-gray-900 text-white rounded-md shadow-lg p-2 hidden group-hover:block z-50">
                <button
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("categorySelected", { detail: "All" }))
                  }
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                >
                  All
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("categorySelected", { detail: "Sport Shoes" }))}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Sport Shoes
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("categorySelected", { detail: "Casual Shoes" }))}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Casual Shoes
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("categorySelected", { detail: "Basketball Shoes" }))}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Basketball Shoes
                </button>
              </div>
            </div>
          )}
          <div className="relative group cursor-pointer">
            <span className="hover:underline">Profile</span>
            <div className="absolute right-0 mt-0 w-56 bg-gray-900 text-white rounded-md shadow-lg p-2 hidden group-hover:block z-50">
              <Link to="/profile" className="block px-3 py-2 rounded hover:bg-gray-700">
                <p className="font-semibold">{user.name}</p>
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/");
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {user && user.role === "customer" && (
        <div className="flex items-center space-x-8">
          <Link to="/home" className="hover:underline">Home</Link>
          <Link to="/cart" className="hover:underline">Cart</Link>
          {!isCartPage && (
            <div className="relative group cursor-pointer">
              <span className="hover:underline">Categories</span>
              <div className="absolute left-0 mt-0 w-48 bg-gray-900 text-white rounded-md shadow-lg p-2 hidden group-hover:block z-50">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("categorySelected", { detail: "All" }))}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                >
                  All
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("categorySelected", { detail: "Sport Shoes" }))}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Sport Shoes
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("categorySelected", { detail: "Casual Shoes" }))}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Casual Shoes
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("categorySelected", { detail: "Basketball Shoes" }))}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Basketball Shoes
                </button>
              </div>
            </div>
          )}
          <div className="relative group cursor-pointer">
            <span className="hover:underline">Profile</span>
            <div className="absolute right-0 mt-0 w-56 bg-gray-900 text-white rounded-md shadow-lg p-2 hidden group-hover:block z-50">
              <Link to="/profile" className="block px-3 py-2 rounded hover:bg-gray-700">
                <p className="font-semibold">{user.name}</p>
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/");
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;