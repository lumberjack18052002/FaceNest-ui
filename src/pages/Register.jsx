import Header from "../Components/Header";
import Footer from "../Components/Footer";
import RegisterForm from "../Components/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex flex-1 items-center justify-center ">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
}
