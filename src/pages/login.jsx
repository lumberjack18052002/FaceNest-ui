import ProfileCard from "./Components/ProfileCard";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate=useNavigate();
    const handleLogin=()=>{
        localStorage.setItem('loggedIn','true');
        navigate('/profiles');
    }
    return (
      <main className="flex flex-1 items-center justify-center ">
        <ProfileCard onClick={handleLogin} />
      </main>
  );
}