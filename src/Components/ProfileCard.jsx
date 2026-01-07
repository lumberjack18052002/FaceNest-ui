import { useNavigate } from "react-router-dom";

function ProfileCard() {
  const navigate = useNavigate();
  function onLogin() {
    // after successful login
    localStorage.setItem("token", "dummy-token");
    alert("Login button clicked!");
    navigate("/dashboard", { replace: true });
  }
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-80">
      <h2 className="text-xl font-semibold mb-4 text-centre">Sign In</h2>

      <input
        type="text"
        placeholder="Username"
        className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 "
        onClick={onLogin}
      >
        Sign in
      </button>
    </div>
  );
}

export default ProfileCard;
