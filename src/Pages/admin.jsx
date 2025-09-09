import Navbar from "../components/Navbar";

function Admin() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
        <Navbar></Navbar>
      {/* Admin Card */}
      <div className="relative flex items-center justify-center h-screen z-10">
        <div className="bg-black/40 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-md text-white text-center">
          <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
          <p className="text-lg mb-4">
            Welcome, <span className="font-semibold">Seller</span>!
          </p>
          <p className="text-gray-300">
            Here you can manage products, view orders, and track sales.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Admin;