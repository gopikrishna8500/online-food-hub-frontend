import React from "react";

export default function AccountPage({ user }) {
  if (!user) return null;

  return (
    <div className="p-6 mt-20">
      <h2 className="text-2xl font-bold mb-4">Account Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}
