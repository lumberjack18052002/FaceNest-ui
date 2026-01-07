import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "dummy-token");
    navigate("/dashboard", { replace: true });
  };

  const handleLogout = ({ isLoggedIn, setIsLoggedIn }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    localStorage.removeItem("token");
    alert("You have been logged out.");
    navigate("/login", { replace: true });
  };

  return { handleLogin, handleLogout };
}
