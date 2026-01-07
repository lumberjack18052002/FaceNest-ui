import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to your Dashboard!
          </h2>

          <p className="text-gray-700">
            Here you can manage your profile, view notifications, and access
            various features of FaceNest.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
