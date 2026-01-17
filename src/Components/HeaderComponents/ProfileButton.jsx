import { useAuth } from "../../Context/AuthContext";
import { useEffect, useRef, useState } from "react";

export function ProfileButton() {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const ref = useRef(null);
  const { logout } = useAuth();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative group">
      {/* Avatar button */}
      <button
        aria-label="Profile"
        onClick={() => {
          setOpen((prev) => !prev);
          setClicked(true);
        }}
        className="
          w-10 h-10 rounded-full
          flex items-center justify-center
          transition
          active:scale-95
          hover:ring-2 hover:ring-white/60
        "
      >
        <img
          src="https://i.pravatar.cc/40"
          className="w-9 h-9 rounded-full border"
          alt="profile"
        />
      </button>

      {!clicked && (
        <span
          className="
            absolute top-12 left-1/2 -translate-x-1/2
            opacity-0 group-hover:opacity-100
            transition duration-200
            bg-black text-white text-xs
            px-2 py-1 rounded
            whitespace-nowrap
            pointer-events-none
          "
        >
          Profile
        </span>
      )}

      {open && (
        <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-lg shadow-xl border z-50">
          <div className="p-4 flex gap-3">
            <img
              src="https://i.pravatar.cc/48"
              className="w-12 h-12 rounded-full"
              alt="profile"
            />
            <div>
              <p className="font-semibold text-black">N S Abin Beni</p>
              <p className="text-sm text-gray-600">
                System Engineer @ TCS | Java Backend
              </p>
            </div>
          </div>

          <div className="px-4">
            <button className="w-full border rounded-full py-1 text-sm text-blue-600 hover:bg-blue-50">
              View profile
            </button>
          </div>

          <hr className="my-2" />

          <ul className="text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Settings & Privacy
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Help</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Language
            </li>
          </ul>

          <hr className="my-1" />

          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
