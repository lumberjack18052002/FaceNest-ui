import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PrimaryRole from "./RegisterationComponents/PrimaryRole";
import { useAuth } from "../Context/AuthContext";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const { userId } = useAuth();

  const handlePhoneChange = (value) => {
    setPhone(value);
    if (!value) {
      setPhoneError("");
    } else {
      setPhoneError(isValidPhoneNumber(value) ? "" : "Invalid phone number");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (phone && phoneError) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/data/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId,
          fullName,
          username,
          phone,
          location,
          role,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setFormError(err.message);
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

      {formError && (
        <p className="text-red-500 text-sm mb-4 text-center">{formError}</p>
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
          <label className="block text-gray-700 mb-1">
            Mobile Number <span className="text-gray-400">(optional)</span>
          </label>
          <PhoneInput
            international
            defaultCountry="IN"
            value={phone}
            onChange={handlePhoneChange}
            className="border rounded px-3 py-2 w-full"
          />
          {phoneError && (
            <p className="text-red-500 text-xs mt-1">{phoneError}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Primary Role</label>
          <select
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`w-full px-3 py-2 border rounded bg-white ${
              role === "" ? "text-gray-400" : "text-black"
            }`}
          >
            <option value="" disabled className="text-gray-400">
              Select your role
            </option>
            {PrimaryRole.map((r) => (
              <option key={r.value} value={r.value} className="text-black">
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Country</label>
          <input
            placeholder="Country / Location (optional)"
            className="w-full px-3 py-2 border rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
