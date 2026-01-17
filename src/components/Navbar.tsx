import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavItem from "./navbar/NavItem";

type NavLink = "home" | "ticket";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

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
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="h-20 flex items-center justify-between px-10">
      <img src="/logo.png" alt="Cinemas" className="h-12" />

      <div className="flex items-center gap-10">
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
        className="bg-red-600 text-white px-6 py-2 rounded-2xl font-medium hover:bg-red-700 transition-all duration-150 ease-in cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
