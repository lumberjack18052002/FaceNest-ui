import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profileCreated, setProfileCreated] = useState(false);

  // 🔁 CHECK SESSION ON APP LOAD
  useEffect(() => {
    fetch("http://localhost:8080/auth/me", {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const data = await res.json();
        setIsAuthenticated(true);
        setUserId(data.id);
        setProfileCreated(data.profileCreated);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUserId(null);
      });
  }, []);
  async function login(email, password) {
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username: email, password }),
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Login failed");
    }

    // ✅ SESSION CONFIRM
    const meRes = await fetch("http://localhost:8080/auth/me", {
      credentials: "include",
    });

    if (!meRes.ok) {
      throw new Error("Session verification failed");
    }

    const me = await meRes.json();
    setIsAuthenticated(true);
    setUserId(me.id);
    setProfileCreated(me.profileCreated);

    if (!me.profileCreated) {
      navigate("/register", { replace: true });
    } else {
      const from = "/dashboard";
      navigate(from, { replace: true });
    }

    return me.id;
  }

  async function register(email, password) {
    const res = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error || "Registration failed");
    }
    navigate("/register", { replace: true });
    await login(email, password);
  }

  // 🚪 LOGOUT
  async function logout() {
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setIsAuthenticated(false);
    setUserId(null);
    setProfileCreated(false);
    navigate("/login", { replace: true });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        profileCreated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
