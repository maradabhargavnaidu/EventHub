import { Mail, Phone, User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerAttendeeSchema } from "../../validations/Attendee";
import { useAuth } from "../../hooks/useAuth";
import { FormValidator } from "../../utils/FormValidator";
import InputField from "../../components/InputField";
import { api } from "../../config/api";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Loaders from "@/components/Loader";
type Attendee = {
  name: string;
  mail: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};
const AttendeeSignUp = () => {
  const { dispatch } = useAuth();
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Attendee>({ resolver: yupResolver(registerAttendeeSchema) });

  const mutation = useMutation({
    mutationFn: async (form: Attendee) => {
      const { confirmPassword, ...formData } = form;
      const updatedFormData = { ...formData, role: "attendee" };
      const { data } = await api.post(`/auth/register`, updatedFormData);
      return data;
    },
    onSuccess: (data) => {
      const { user } = data;
      dispatch({ type: "LOGIN", payload: user });
      toast.success("Account created successfully! Welcome aboard.");
      Navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<Attendee> = async (form) => {
    const isValid = await FormValidator(registerAttendeeSchema, form);
    if (isValid) {
      // console.log(isValid);
      mutation.mutate(form);
    } else {
      toast.error("OOPS! some error occured");
      console.log(isValid);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 bg-[#1e1e1e]">
      {mutation.isPending && <Loaders head={"Creating your Account..."} />}
      <div className="absolute inset-0 bg-[#1e1e1e] bg-opacity-90 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl rounded-lg p-6">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mt-3">
            Create your account
          </h2>
          <p className="text-zinc-400">
            Get started with managing your events. Fill in the details below.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            id="name"
            label="Full Name"
            icon={<User />}
            placeholder="John Doe"
            // value={form.name}
            {...register("name")}
            error={errors.name?.message}
          />
          <InputField
            id="mail"
            label="Email"
            type="email"
            icon={<Mail />}
            placeholder="you@example.com"
            // value={form.mail}
            {...register("mail")}
            error={errors.mail?.message}
          />
          <InputField
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            icon={<Phone />}
            placeholder="9876543210"
            // value={form.phoneNumber}
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            icon={<Lock />}
            // value={form.password}
            {...register("password")}
            error={errors.password?.message}
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            icon={<Lock />}
            // value={form.confirmPassword}
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <button
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2 rounded-lg hover:from-purple-600 hover:to-blue-700"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/attendee-login"
            className="text-purple-400 hover:text-purple-300"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AttendeeSignUp;
