import logo from "../assets/FaceNest_logo.png";
import useAuth from "../utils/auth";

export default function Header() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const { handleLogout } = useAuth();
  return (
    <header className="w-screen h-14 bg-blue-600 text-white flex items-center px-4 shadow-md relative">
      <h1 className="text-xl font-semibold flex items-center gap-2">
        <img src={logo} alt="FaceNest Logo" className="w-8 h-8" />
        FaceNest
      </h1>
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          aria-label="Profile"
          className="group absolute right-4 top-1/2 -translate-y-1/2
                   w-10 h-10 rounded-full bg-white text-blue-600
                   flex items-center justify-center
                   hover:bg-blue-500 hover:text-white
                   active:scale-95 transition"
        >
          👤
          <span
            className="absolute top-12 right-1/2 translate-x-1/2
                     opacity-0 group-hover:opacity-100
                     transition bg-black text-white text-xs
                     px-2 py-1 rounded whitespace-nowrap"
          >
            Profile
          </span>
        </button>
      )}
    </header>
  );
}
