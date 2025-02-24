import { Link } from "react-router-dom";
import { Building2, Mail, Phone, User } from "lucide-react";

const EventHostsSignUp = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] p-4 pt-24">
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold">Create your host account</h2>
                    <p className="text-gray-500">Get started with managing your events. Fill in the details below to create your account.</p>
                </div>
                <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block font-medium">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input id="name" type="text" placeholder="John Doe" className="pl-10 p-2 border rounded-md w-full" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block font-medium">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input id="email" type="email" placeholder="you@example.com" className="pl-10 p-2 border rounded-md w-full" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="organization" className="block font-medium">Organization/Company Name</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input id="organization" type="text" placeholder="Your Company Ltd." className="pl-10 p-2 border rounded-md w-full" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phone" className="block font-medium">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="pl-10 p-2 border rounded-md w-full" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block font-medium">Password</label>
                        <input id="password" type="password" className="p-2 border rounded-md w-full" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="confirm-password" className="block font-medium">Confirm Password</label>
                        <input id="confirm-password" type="password" className="p-2 border rounded-md w-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-4 mt-6">
                    <button className="w-full bg-blue-600 text-white p-2 rounded-md">Create Account</button>
                    <div className="text-sm text-gray-500 text-center">
                        Already have an account?{" "}
                        <Link to="/host-login" className="text-blue-600 underline hover:no-underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventHostsSignUp;
