import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AdminLogin = ({ backendUrl, settoken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        `${backendUrl}/api/auth/admin`,
        { email, password },
        { withCredentials: true }
      )

      if (res.data.success) {
        localStorage.setItem("token", res.data.token) 
        settoken(res.data.token)
        toast.success("Login Successful")
      } else {
        toast.error(res.data.message || "Login failed")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="
          w-full max-w-sm
          bg-white
          p-6 sm:p-8
          rounded-xl
          shadow-lg
        "
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center font-display">
          Admin Panel
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1 font-display">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@email.com"
            className="
              w-full
              px-4 py-2.5
              border rounded-md
              text-sm sm:text-base
              focus:outline-none
              focus:ring-2 focus:ring-black
            "
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1 font-display">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="
              w-full
              px-4 py-2.5
              border rounded-md
              text-sm sm:text-base
              focus:outline-none
              focus:ring-2 focus:ring-black
            "
            required
          />
        </div>

        <button
          type="submit"
          className="
            w-full
            bg-black text-white
            py-2.5
            rounded-md
            text-sm sm:text-base
            hover:bg-gray-900
            transition
            cursor-pointer font-display
          "
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
