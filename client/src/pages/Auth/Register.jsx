import { useState } from 'react'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  return (
    <div>
      <h1>Register</h1>
      <form>
        <label>
          Name
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label>
          Email
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
