"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewEmployeeForm() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    roleName: "waiter",
    hourlyRate: "",
    overTimeRate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        hourlyRate: parseFloat(formData.hourlyRate),
        overTimeRate: parseFloat(formData.overTimeRate),
      }),
    })

    if (res.ok) {
      router.push("/Employee")
    } else {
      alert("Failed to create employee")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-semibold">Add New Employee</h2>

      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        className="w-full p-2 border rounded"
        required
      />

      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full p-2 border rounded"
        required
      />

      <select
        name="roleName"
        value={formData.roleName}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="waiter">Waiter</option>
        <option value="bartender">Bartender</option>
        <option value="hookah">Hookah</option>
        <option value="kitchen">Kitchen</option>
      </select>

      <input
        name="hourlyRate"
        type="number"
        value={formData.hourlyRate}
        onChange={handleChange}
        placeholder="Hourly Rate"
        className="w-full p-2 border rounded"
        required
      />

      <input
        name="overTimeRate"
        type="number"
        value={formData.overTimeRate}
        onChange={handleChange}
        placeholder="Overtime Rate"
        className="w-full p-2 border rounded"
        required
      />

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Add Employee
      </button>
    </form>
  )
}
