import { Form, useActionData, redirect } from "react-router-dom";

// Links API
const API = import.meta.env.VITE_API;

export default function Register() {
  const data = useActionData();

  //   Registers Page
  return (
    <article>
      <h1>Register</h1>
      {data?.error && <p style={{ color: "red" }}>Error: {data.error}</p>}

      <Form method="post">
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text" required />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
        </div>

        <button type="submit">Register</button>
      </Form>
    </article>
  );
}

// Handles Form Submit
export async function registerAction({ request }) {
  const formData = Object.fromEntries(await request.formData());

  try {
    const res = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) return { error: data.message || "Registration failed" };

    return redirect("/login");
  } catch (err) {
    return { error: err.message };
  }
}
