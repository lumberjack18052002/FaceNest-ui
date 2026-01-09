import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

function ProfileCard() {
  const { login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    try {
      await login(email, password);
    } catch {
      alert("Invalid credentials");
    }
  };

  const onRegister = async () => {
    try {
      await register(email, password);
    } catch {
      alert("Registering failed");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-80">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {isRegisterMode ? "Sign Up" : "Sign In"}
      </h2>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      <p
        className="text-xs text-blue-500 hover:underline mb-4 cursor-pointer"
        onClick={() => setIsRegisterMode(!isRegisterMode)}
      >
        {isRegisterMode
          ? "Already have an account? Sign in"
          : "Don't have an account? Register"}
      </p>

      <button
        className="w-full bg-blue-500 text-white py-2 rounded"
        onClick={isRegisterMode ? onRegister : onSubmit}
      >
        {isRegisterMode ? "Sign up" : "Sign in"}
      </button>
    </div>
  );
}

export default ProfileCard;
