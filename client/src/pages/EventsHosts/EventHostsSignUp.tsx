import { yupResolver } from "@hookform/resolvers/yup";
import { Building2, Mail, Phone, User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { registerHostSchema } from "../../validations/Hosts";
import { FormValidator } from "../../utils/FormValidator";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../config/api";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Loaders from "@/components/Loader";
type Host = {
  name: string;
  organization: string;
  mail: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};
const EventHostSignup = () => {
  const { dispatch } = useAuth();
  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Host>({ resolver: yupResolver(registerHostSchema) });
  const mutation = useMutation({
    mutationFn: async (form: Host) => {
      const { confirmPassword, ...formData } = form;
      const updatedFormData = { ...formData, role: "host" };
      const { data } = await api.post(`/auth/register`, updatedFormData);
      return data;
    },
    onSuccess: (data: any) => {
      if (data) {
        const { user } = data;
        dispatch({ type: "LOGIN", payload: user });
        toast.success(
          "Welcome aboard! Your account has been created and you're now signed in."
        );
        Navigate("/dashboard");
      }
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Something went wrong..");
      console.log(error);
    },
  });
  const onSubmit: SubmitHandler<Host> = async (form) => {
    const isValid = await FormValidator(registerHostSchema, form);
    if (isValid) mutation.mutate(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 bg-[#1e1e1e]">
      {mutation.isPending && <Loaders head={"Creating your account..."} />}
      <div className="absolute inset-0 bg-[#1e1e1e] bg-opacity-90 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl rounded-lg p-6">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mt-3">
            Create your host account
          </h2>
          <p className="text-zinc-400">
            Get started with managing your events. Fill in the details below.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="grid gap-4 md:grid-cols-2"> */}
          <InputField
            id="name"
            label="Full Name"
            icon={<User />}
            placeholder="John Doe"
            error={errors.name?.message}
            // value={form.name}
            // onChange={handleChange}
            {...register("name")}
          />
          <InputField
            id="organization"
            label="Organization"
            icon={<Building2 />}
            placeholder="Your Company Ltd."
            error={errors.organization?.message}
            {...register("organization")}
            // value={form.organization}
            // onChange={handleChange}
          />
          {/* </div> */}
          <InputField
            id="mail"
            label="Email"
            type="email"
            icon={<Mail />}
            error={errors.mail?.message}
            placeholder="you@example.com"
            {...register("mail")}
            // value={form.mail}
            // onChange={handleChange}
          />
          <InputField
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            icon={<Phone />}
            placeholder="+91 (555) 000-0000"
            error={errors.phoneNumber?.message}
            {...register("phoneNumber")}
            // value={form.phoneNumber}
            // onChange={handleChange}
          />
          {/* <div className="grid gap-4 md:grid-cols-2"> */}
          <InputField
            id="password"
            label="Password"
            type="password"
            icon={<Lock />}
            {...register("password")}
            error={errors.password?.message}
            // value={form.password}
            // onChange={handleChange}
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            icon={<Lock />}
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            // value={form.confirmPassword}
            // onChange={handleChange}
          />
          {/* </div> */}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2 rounded-lg hover:from-purple-600 hover:to-blue-700"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/host-login"
            className="text-purple-400 hover:text-purple-300"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventHostSignup;
