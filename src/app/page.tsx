import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
     

      {/* Main Content */}
      <main className="flex-1 flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl">Nextjs Authentication with API routes!</h1>
          <h2 className="text-2xl text-blue-600">using mongodb atlas</h2>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm py-4 bg-gray-100 dark:bg-gray-900 text-gray-500">
        © 2025 MyApp. All rights reserved.
      </footer>
    </div>
  );
}
