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
            {currentUser && (
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm">
              <span className="text-slate-500">Signed in as</span>
              <span className="font-medium">{currentUser}</span>
            </div>
            )}
          </div>
        </header>

      {/* Main content */}
      {/* Main content */}
        <main className="mx-auto w-full max-w-5xl px-4 py-10">
        {currentUser ? (
            // ===== Logged in layout (keep your current style) =====
            <>
            <div className="grid gap-6 lg:grid-cols-[1fr,360px]">
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold tracking-tight">Your tasks</h2>
                    <p className="mt-1 text-sm text-slate-500">
                    Mark off tasks, or create new ones.
                    </p>
                </div>

                <TodoList username={currentUser} onLogout={handleLogout} />
                </section>
            </div>

            <footer className="mt-10 text-center text-xs text-slate-500">
                ID: 67011220 & Built with Vite + React + Tailwind CSS
            </footer>
            </>
        ) : (
            // ===== Logged out (PRO login layout) =====
            <div className="mx-auto grid w-full max-w-4xl items-center gap-8 lg:grid-cols-2">
            {/* Left: Login card */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-xl border border-slate-200 bg-slate-50">
                    {/* Small logo/icon area */}
                    <img
                    src="/cei-logo.png"
                    alt="CEI Logo"
                    className="h-7 w-7 object-contain"
                    />
                </div>
                <div className="leading-tight">
                    <h1 className="text-lg font-semibold tracking-tight">
                    Full Stack Todo
                    </h1>
                    <p className="text-sm text-slate-500">
                    Sign in to continue
                    </p>
                </div>
                </div>

                <Login onLogin={handleLogin} />

            </section>

            <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-base font-semibold tracking-tight">
                About This App:
                </h2>

                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex gap-3">
                    <span className="mt-0.5 inline-block size-2.5 shrink-0 rounded-full bg-slate-300" />
                    Create tasks in seconds and keep everything organized.
                </li>
                <li className="flex gap-3">
                    <span className="mt-0.5 inline-block size-2.5 shrink-0 rounded-full bg-slate-300" />
                    Your login is remembered on this device until you log out.
                </li>
                </ul>

                <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                Tip: Use a consistent username so your tasks stay under one account.
                </div>

                <footer className="mt-6 text-center text-xs text-slate-500">
                ID: 67011220 & Built with Vite + React + Tailwind CSS
                </footer>
            </aside>
            </div>
        )}
        </main>

    </div>
  );
}
