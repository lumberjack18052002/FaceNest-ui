import logo from "../assets/FaceNest_logo.png";
import { useAuth } from "../Context/AuthContext";
import { ProfileButton } from "./HeaderComponents/ProfileButton.jsx";

export default function Header() {
  const isLoggedIn = useAuth().isAuthenticated;
  return (
    <header className="w-screen h-14 bg-blue-600 text-white flex items-center px-4 shadow-md relative">
      <h1 className="text-xl font-semibold flex items-center gap-2">
        <img src={logo} alt="FaceNest Logo" className="w-8 h-8" />
        FaceNest
      </h1>
      {isLoggedIn && <ProfileButton />}
    </header>
  );
}
