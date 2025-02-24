import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export default function HostsLogin() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] pt-24 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Welcome back</h2>
                <p className="text-gray-600 text-center mb-4">Sign in to your event host account</p>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <input
                        id="password"
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Sign In
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don&apos;t have an account?{" "}
                    <Link to="/host-signup" className="text-blue-600 hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}
