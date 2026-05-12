"use client";

import { useState, useMemo } from "react";
import { Check, Brain, Target } from "lucide-react";

type Subject = "Maths" | "Physics" | "Chemistry" | "Biology" | "History";

type Task = {
  id: string;
  title: string;
  subject: Subject;
  done: boolean;
};

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState<Subject>("Maths");

  const [score, setScore] = useState(0);

  function addTask() {
    if (!title) return;

    setTasks([
      {
        id: crypto.randomUUID(),
        title,
        subject,
        done: false,
      },
      ...tasks,
    ]);

    setTitle("");
  }

  function toggle(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  const completed = useMemo(
    () => tasks.filter((t) => t.done).length,
    [tasks]
  );

  const streakScore = useMemo(() => {
    return completed * 10 + score;
  }, [completed, score]);

  function focusGame() {
    setScore((s) => s + Math.floor(Math.random() * 10 + 1));
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Brain /> A-Level Flow
          </h1>
          <p className="text-zinc-400 mt-2">
            Study smarter. Not harder.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-zinc-900 p-4 rounded-2xl">
            Tasks: <b>{tasks.length}</b>
          </div>

          <div className="bg-zinc-900 p-4 rounded-2xl">
            Completed: <b>{completed}</b>
          </div>

          <div className="bg-zinc-900 p-4 rounded-2xl text-emerald-400">
            Flow Score: <b>{streakScore}</b>
          </div>
        </div>

        {/* ADD TASK */}
        <div className="bg-zinc-900 p-6 rounded-3xl space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Target /> Add Revision Task
          </h2>

          <div className="grid md:grid-cols-3 gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Solve integration problems"
              className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
            />

            <select
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value as Subject)
              }
              className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
            >
              <option>Maths</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Biology</option>
              <option>History</option>
            </select>

            <button
              onClick={addTask}
              className="bg-emerald-400 text-black font-bold rounded-xl"
            >
              Add
            </button>
          </div>
        </div>

        {/* TASK LIST */}
        <div className="space-y-3">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="bg-zinc-900 p-5 rounded-3xl flex justify-between items-center border border-zinc-800"
            >
              <div>
                <h3 className="font-bold">{t.title}</h3>
                <p className="text-zinc-400 text-sm">
                  {t.subject}
                </p>
              </div>

              <button
                onClick={() => toggle(t.id)}
                className={`px-4 py-2 rounded-xl font-bold ${
                  t.done
                    ? "bg-green-400 text-black"
                    : "bg-red-500"
                }`}
              >
                <Check />
              </button>
            </div>
          ))}
        </div>

        {/* MINI GAME */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 rounded-3xl text-black">
          <h2 className="text-2xl font-bold">
            Stress Smash Mini Game 🎮
          </h2>

          <p className="mt-2 font-medium">
            Click to "destroy distractions" and boost focus.
          </p>

          <button
            onClick={focusGame}
            className="mt-4 bg-black text-white px-6 py-3 rounded-2xl font-bold"
          >
            Smash Distraction 💥
          </button>

          <p className="mt-3">
            Focus Points: <b>{score}</b>
          </p>
        </div>

      </div>
    </main>
  );
}