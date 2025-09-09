function Footer() {
  return (
    <footer className="absolute bottom-0 w-full bg-black bg-opacity-70 text-gray-400 text-center py-4 z-20 ">
      <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
    </footer>
  );
}

export default Footer;