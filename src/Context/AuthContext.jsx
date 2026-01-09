import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // CHECK SESSION ON APP LOAD
  useEffect(() => {
    fetch("http://localhost:8080/auth/me", {
      credentials: "include",
    })
      .then((res) => setIsAuthenticated(res.ok))
      .catch(() => setIsAuthenticated(false));
  }, []);

  // LOGIN
  async function login(email, password) {
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username: email, password }),
      credentials: "include",
    });

    if (!res.ok) throw new Error("Login failed");

    // 🔁 VERIFY SESSION
    const me = await fetch("http://localhost:8080/auth/me", {
      credentials: "include",
    });

    setIsAuthenticated(me.ok);
    const from = location.state?.from?.pathname || "/dashboard";
    navigate(from, { replace: true });
  }

  //  REGISTER
  async function register(email, password) {
    const res = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) throw new Error("Register failed");

    setIsAuthenticated(true);
    navigate("/dashboard", { replace: true });
  }

  // LOGOUT
  async function logout() {
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
