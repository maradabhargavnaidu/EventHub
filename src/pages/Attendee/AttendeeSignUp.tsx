import { useState } from "react";
import { Mail, Phone, User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { registerAttendeeSchema } from '../validations/Attendee'
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { FormValidator } from "../utils/FormValidator";

const AttendeeSignUp = () => {
    const { dispatch } = useAuth();
    const Navigate = useNavigate()
    const [form, setForm] = useState({
        fullName: "",
        mail: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { confirmPassword, ...formData } = form;
        const isValid = await FormValidator(registerAttendeeSchema, formData);
        if (isValid) {
            try {
                const { confirmPassword, ...formData } = form;
                const { data } = await axios.post(`http://localhost:5000/api/auth/registerAttendee`, formData);
                if (data) {
                    const { attendee } = data
                    dispatch({ type: "LOGIN", payload: attendee });
                    Navigate('/attendee-dashboard')
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log(isValid);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-20 bg-[#1e1e1e]">
            <div className="absolute inset-0 bg-[#1e1e1e] bg-opacity-90 backdrop-blur-sm" />
            <div className="relative w-full max-w-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl rounded-lg p-6">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mt-3">Create your account</h2>
                    <p className="text-zinc-400">Get started with managing your events. Fill in the details below.</p>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <InputField
                        id="fullName" label="Full Name" icon={<User />} placeholder="John Doe"
                        value={form.fullName} onChange={handleChange} error={errors.fullName}
                    />
                    <InputField
                        id="mail" label="Email" type="email" icon={<Mail />} placeholder="you@example.com"
                        value={form.mail} onChange={handleChange} error={errors.mail}
                    />
                    <InputField
                        id="phoneNumber" label="Phone Number" type="tel" icon={<Phone />} placeholder="9876543210"
                        value={form.phoneNumber} onChange={handleChange} error={errors.phoneNumber}
                    />
                    <InputField
                        id="password" label="Password" type="password" icon={<Lock />}
                        value={form.password} onChange={handleChange} error={errors.password}
                    />
                    <InputField
                        id="confirmPassword" label="Confirm Password" type="password" icon={<Lock />}
                        value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword}
                    />

                    <button type="submit" className="w-full cursor-pointer bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2 rounded-lg hover:from-purple-600 hover:to-blue-700">
                        Create Account
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-zinc-400">
                    Already have an account?{" "}
                    <Link to="/attendee-login" className="text-purple-400 hover:text-purple-300">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AttendeeSignUp;