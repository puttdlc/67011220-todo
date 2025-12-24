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
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900" />
            <div className="leading-tight">
              <h1 className="text-base font-semibold tracking-tight">
                Full Stack Todo
              </h1>
              <p className="text-sm text-slate-500">
                Simple, clean, and fast.
              </p>
            </div>
          </div>

          {currentUser && (
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm">
              <span className="text-slate-500">Signed in as</span>
              <span className="font-medium">{currentUser}</span>
            </div>
          )}
        </div>
      </header>

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
                  ? "Add, complete, and stay organized."
                  : "Log in to access your todo list."}
              </p>
            </div>

            {currentUser ? (
              <TodoList username={currentUser} onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </section>

          {/* Side panel */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Tips
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                Keep todos short and actionable.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                Use priorities (Today / Soon / Later) if you add them later.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                Small wins daily beats big plans rarely.
              </li>
            </ul>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Pro UI note: this layout is responsive by default and looks good
                on phone + desktop.
              </p>
            </div>
          </aside>
        </div>

        <footer className="mt-10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Full Stack Todo • Built with React + Tailwind
        </footer>
      </main>
    </div>
  );
}