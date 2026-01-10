import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("FULL_STACK");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          email,
          password,
          role,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Welcome to FaceNest
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Create your developer profile
      </p>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 mb-1">Full Name</label>
          <input
            className="w-full px-3 py-2 border rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            className="w-full px-3 py-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            facenest.com/@{username || "username"}
          </p>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Primary Role</label>
          <select
            className="w-full px-3 py-2 border rounded bg-white"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="FRONTEND">Frontend Developer</option>
            <option value="BACKEND">Backend Developer</option>
            <option value="FULL_STACK">Full-Stack Developer</option>
            <option value="MOBILE">Mobile Developer</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          disabled={loading}
          className={`w-full py-2 rounded text-white flex justify-center items-center gap-2
            ${loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"}`}
          type="submit"
        >
          {loading && (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
