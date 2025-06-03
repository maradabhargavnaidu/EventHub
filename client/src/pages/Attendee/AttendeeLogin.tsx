import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import InputField from "../../components/InputField";
import { FormValidator } from "../../utils/FormValidator";
import { loginAttendeeSchema } from "../../validations/Attendee";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../config/api";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Loaders from "@/components/Loader";

type Attendee = {
  mail: string;
  password: string;
};
export default function AttendeeLogin() {
  const { dispatch } = useAuth();
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Attendee>({ resolver: yupResolver(loginAttendeeSchema) });

  const mutation = useMutation({
    mutationFn: (formData: Attendee) =>
      api.post("/auth/login", {
        ...formData,
        role: "attendee",
      }),
    onSuccess: (response) => {
      const { user } = response.data;
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
        toast.success("Login successful. Welcome!");
        Navigate("/dashboard");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
      // console.log(error);
    },
  });

  const onSubmit: SubmitHandler<Attendee> = async (formData) => {
    console.log(formData);
    const isValid = await FormValidator(loginAttendeeSchema, formData);
    if (isValid) {
      mutation.mutate(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] py-20 p-4">
      {mutation.isPending && <Loaders head={"Signing in..."} />}
      <div className="relative w-full max-w-md border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl rounded-lg p-6">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mt-3">Welcome back</h2>
          <p className="text-zinc-400">Sign in to your account</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            id="mail"
            label="Email"
            type="email"
            icon={<Mail />}
            placeholder="you@example.com"
            error={errors?.mail?.message}
            {...register("mail")}
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
              error={errors?.password?.message}
              {...register("password")}
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
            to="/attendee-signup"
            className="text-purple-400 hover:text-purple-300"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
