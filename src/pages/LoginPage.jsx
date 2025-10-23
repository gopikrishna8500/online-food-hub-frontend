import React, { useState } from "react";

export default function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find(u => u.email === email && u.password === password);
    if (existingUser) {
      setUser(existingUser);
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button onClick={handleLogin} className="w-full bg-orange-600 text-white py-2 rounded">Login</button>
      </div>
    </div>
  );
}
