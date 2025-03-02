import { useState } from "react";
import { Building2, Mail, Phone, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";

const EventHostSignup = () => {
    const [form, setForm] = useState({
        name: "",
        organization: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", form);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-20 bg-[#1e1e1e]">
            <div className="absolute inset-0 bg-[#1e1e1e] bg-opacity-90 backdrop-blur-sm" />
            <div className="relative w-full max-w-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl rounded-lg p-6">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mt-3">Create your host account</h2>
                    <p className="text-zinc-400">Get started with managing your events. Fill in the details below.</p>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    {/* <div className="grid gap-4 md:grid-cols-2"> */}
                    <InputField id="name" label="Full Name" icon={<User />} placeholder="John Doe" value={form.name} onChange={handleChange} />
                    <InputField id="organization" label="Organization" icon={<Building2 />} placeholder="Your Company Ltd." value={form.organization} onChange={handleChange} />
                    {/* </div> */}
                    <InputField id="email" label="Email" type="email" icon={<Mail />} placeholder="you@example.com" value={form.email} onChange={handleChange} />
                    <InputField id="phone" label="Phone Number" type="tel" icon={<Phone />} placeholder="+91 (555) 000-0000" value={form.phone} onChange={handleChange} />
                    {/* <div className="grid gap-4 md:grid-cols-2"> */}
                    <InputField id="password" label="Password" type="password" icon={<Lock />} value={form.password} onChange={handleChange} />
                    <InputField id="confirmPassword" label="Confirm Password" type="password" icon={<Lock />} value={form.confirmPassword} onChange={handleChange} />
                    {/* </div> */}

                    <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2 rounded-lg hover:from-purple-600 hover:to-blue-700">
                        Create Account
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-zinc-400">
                    Already have an account?{" "}
                    <Link to="/host-login" className="text-purple-400 hover:text-purple-300">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventHostSignup;
