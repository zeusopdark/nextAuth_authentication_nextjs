"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify(formData), // Corrected this line
      headers: {
        "Content-Type": "application/json", // Corrected this line
      },
    });

    if (!res.ok) {
      const response = await res.json();
      setError(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <form
        method="post"
        className="flex flex-col gap-3 w-1/2"
        onSubmit={handleSubmit}
      >
        <h1>Create new user</h1>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          required={true}
          value={formData.name}
          className="m-2 bg-slate-400 rounded"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          required={true}
          value={formData.email}
          className="m-2 bg-slate-400 rounded"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required={true}
          value={formData.password}
          className="m-2 bg-slate-400 rounded"
        />
        <button>Create User</button>
      </form>
      <p className="text-red-500">{error}</p>
    </>
  );
};

export default UserForm;
