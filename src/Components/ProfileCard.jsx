import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

function ProfileCard() {
  const { login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async () => {
    setClicked(true);
    setLoginError(false);
    setErrorMessage("");
    setLoading(true);

    const start = Date.now();
    const MIN_TIME = 500;

    try {
      await login(email, password);
    } catch (e) {
      setLoginError(true);
      setErrorMessage(e.message || "Invalid email or password");
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < MIN_TIME) {
        await wait(MIN_TIME - elapsed);
      }
      setLoading(false);
    }
  };

  const onRegister = async () => {
    setClicked(true);
    const start = Date.now();
    setLoading(true);
    const MIN_TIME = 500;
    try {
      await register(email, password);
    } catch (e) {
      setLoginError(true);
      console.log(e.message);
      setErrorMessage(e.message || "Registration failed");
      alert("Registering failed");
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < MIN_TIME) {
        await wait(MIN_TIME - elapsed);
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-80">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {isRegisterMode ? "Sign Up" : "Sign In"}
      </h2>
      <div>
        {clicked && loginError && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}
      </div>
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
        disabled={loading}
        className={`w-full py-2 rounded text-white flex items-center justify-center gap-2
    ${
      loading
        ? "bg-blue-400 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600"
    }`}
        onClick={isRegisterMode ? onRegister : onSubmit}
      >
        {loading && (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}

        <span>
          {loading
            ? isRegisterMode
              ? "Signing up..."
              : "Signing in..."
            : isRegisterMode
            ? "Sign up"
            : "Sign in"}
        </span>
      </button>
    </div>
  );
}

export default ProfileCard;
