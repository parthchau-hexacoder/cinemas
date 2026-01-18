import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavItem from "./navbar/NavItem";

type NavLink = "home" | "ticket";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const active: NavLink = location.pathname.includes("ticket") ? "ticket" : "home";

  if (!isAuthenticated) {
    return null;
  }

  function handleClick(item: NavLink) {
    if (item === 'ticket') {
      navigate('/ticket');
    } else {
      navigate('/');
    }
    setIsMenuOpen(false);
  }

  function handleLogout() {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  }

  return (
    <nav className="h-20 flex items-center justify-between px-6 md:px-10 lg:px-20 relative">
      <img src="/logo.png" alt="Cinemas" className="h-10 md:h-12" />


      <button
        className="md:hidden text-blue-600 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          )}
        </svg>
      </button>


      <div className="hidden md:flex items-center gap-10">
        {(["home", "ticket"] as const).map((item) => (
          <NavItem
            key={item}
            item={item}
            isActive={active === item}
            onClick={handleClick}
          />
        ))}
      </div>

      <button
        className="hidden md:block bg-red-600 text-white px-6 py-2 rounded-2xl font-medium hover:bg-red-700 transition-all duration-150 ease-in cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>


      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-lg p-6 flex flex-col gap-6 md:hidden z-50">
          {(["home", "ticket"] as const).map((item) => (
            <NavItem
              key={item}
              item={item}
              isActive={active === item}
              onClick={handleClick}
            />
          ))}
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-2xl font-medium hover:bg-red-700 transition-all duration-150 ease-in cursor-pointer w-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
