import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import InputField from "../../components/InputField";
import { loginHostSchema } from "../../validations/Hosts";
import { FormValidator } from "../../utils/FormValidator";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

export default function HostsLogin() {
  const { dispatch } = useAuth();
  const Navigate = useNavigate();

  const [form, setForm] = useState({ mail: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await FormValidator(loginHostSchema, form);
    if (isValid) {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/login",
          { ...form, role: "host" }
        );
        const { user } = data;
        if (user) {
          dispatch({ type: "LOGIN", payload: user });
          Navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] py-20 p-4">
      <div className="relative w-full max-w-md border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl rounded-lg p-6">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mt-3">Welcome back</h2>
          <p className="text-zinc-400">Sign in to your event host account</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <InputField
            id="mail"
            label="Email"
            type="email"
            icon={<Mail />}
            placeholder="you@example.com"
            value={form.mail}
            onChange={handleChange}
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-zinc-300">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-purple-400 hover:text-purple-300"
              >
                Forgot password?
              </Link>
            </div>
            <InputField
              id="password"
              label=""
              type="password"
              icon={<Lock />}
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2 rounded-lg hover:from-purple-600 hover:to-blue-700"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-zinc-400 mt-4">
          Don&apos;t have an account?{" "}
          <Link
            to="/host-signup"
            className="text-purple-400 hover:text-purple-300"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
