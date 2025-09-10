import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="absolute top-0 w-full flex justify-between items-center px-10 py-4 text-white z-20 bg-black">
      <Link
          to="/">
        <h1 className="text-2xl font-bold">Sneako</h1>
        </Link>
      </nav>
  );
}

export default Navbar;