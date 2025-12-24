// frontend/src/App.js
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import TodoList from "./components/TodoList";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("todo_username");
    if (storedUser) setCurrentUser(storedUser);
  }, []);

  const handleLogin = (username) => setCurrentUser(username);

  const handleLogout = () => {
    localStorage.removeItem("todo_username");
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top bar (only show when logged in) */}
      {currentUser && (
        <header className="border-b border-slate-200 bg-white/70 backdrop-blur">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="size-20 shrink-0 overflow-hidden rounded-xl">
                <img
                  src="/cei-logo.png"
                  alt="CEI Logo"
                  className="h-full w-full"
                />
              </div>

              <div className="leading-tight">
                <h1 className="h-5 font-semibold tracking-tight">
                  Full Stack Todo
                </h1>
                <p className="text-sm text-slate-500">
                  Simple to-do list for your daily needs.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm">
              <span className="text-slate-500">Signed in as</span>
              <span className="font-medium">{currentUser}</span>
            </div>
          </div>
        </header>
      )}

      {/* Main content */}
      <main className="mx-auto w-full max-w-5xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr,360px]">
          {/* Primary card */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold tracking-tight">
                {currentUser ? "Your tasks" : "Welcome back"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {currentUser
                  ? "Mark off tasks, or create new ones."
                  : "Log in to access your todo list."}
              </p>
            </div>

            {currentUser ? (
              <TodoList username={currentUser} onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </section>
        </div>

        <footer className="mt-10 text-center text-xs text-slate-500">
          ID: 67011220 & Built with Vite + React + Tailwind CSS
        </footer>
      </main>
    </div>
  );
}
