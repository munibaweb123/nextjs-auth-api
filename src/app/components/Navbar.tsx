import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-900">
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          MyApp
        </div>
        <div className="space-x-4">
            <Link
            href="/"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Home
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Signup
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Login
          </Link>
          <Link
            href="/profile"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Profile
          </Link>
        </div>
      </nav>
  )
}

