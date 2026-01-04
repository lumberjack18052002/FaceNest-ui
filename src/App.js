import { use, useState } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ProfileCard from "./Components/ProfileCard";
import Dashboard from "./Components/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isLoggedIn={isLoggedIn} />
      <main className="flex flex-1 items-center justify-center ">
        {isLoggedIn ? (
          <Dashboard />
        ) : (
          <ProfileCard
            onLogin={() => {
              setIsLoggedIn(true);
            }}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
