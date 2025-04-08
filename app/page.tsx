"use client";
import React from "react";
import TaskList from "../components/TaskList";
import TaskForm from "@/components/TaskForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4 max-w-2xl mx-auto">
        <div className="mb-4">
          <TaskForm />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 h-96 overflow-y-auto">
          <TaskList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
