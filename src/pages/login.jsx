import ProfileCard from "../Components/ProfileCard";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex flex-1 items-center justify-center ">
        <ProfileCard />
      </main>
      <Footer />
    </div>
  );
}
