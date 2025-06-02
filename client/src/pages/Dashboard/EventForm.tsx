import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

import {
  MapPin,
  User,
  Mail,
  Phone,
  Globe,
  Building,
  IndianRupee,
  Sparkles,
  Loader,
  Tag,
} from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import InputField from "@/components/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "@/validations/Events";
import { FormValidator } from "@/utils/FormValidator";
import { useNavigate } from "react-router-dom";
import { api } from "@/config/api";
import DashboardNav from "./DashboardNav";

export type EventFormData = {
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;

  type: "online" | "physical" | "hybrid" | undefined;

  venueName?: string;
  address?: string;
  onlineLink?: string;

  hostName: string;
  contactEmail: string;
  contactPhone?: string;

  isPaidEvent: boolean;

  price?: number;
  quantity?: number;
};

export default function EventForm() {
  const Navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(eventSchema) });

  const locationType = watch("type");
  const mutation = useMutation({
    mutationFn: async (form: EventFormData) => {
      const response = await api.post("/events/create-event", form);
      return response.data;
    },
    onSuccess: (data: any) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["events"] });
        Navigate("/dashboard");
      }
      toast.success("Event created successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<EventFormData> = async (form) => {
    const isValid = await FormValidator(eventSchema, form);
    // console.log(form);
    if (isValid) {
      mutation.mutate(form);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100">
      <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
        {mutation.isPending && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#1e1e1e]/90 backdrop-blur-md border border-white/10 rounded-xl p-6 flex items-center gap-3">
              <Loader className="w-6 h-6 animate-spin text-purple-400" />
              <span className="text-white">Creating your event...</span>
            </div>
          </div>
        )}

        {/* Header */}
        <DashboardNav title="CreateEvent" />

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className=" backdrop-blur-xl bg-[#252525]  transition-all duration-300 hover:shadow-lg  rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {/* Event Title */}
              <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <InputField
                  id="title"
                  label="Event Title"
                  type="text"
                  placeholder="Enter your amazing event title"
                  required={true}
                  error={errors.title?.message}
                  icon={<Sparkles className="w-4 h-4" />}
                  {...register("title")}
                />
              </div>

              {/* Event Description */}
              <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <InputField
                  id="description"
                  label="Event Description"
                  type="textarea"
                  placeholder="Describe your event in detail... What makes it special?"
                  required
                  error={errors.description?.message}
                  {...register("description")}
                />
              </div>

              {/* Date & Time */}
              <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
                <InputField
                  id="startDateTime"
                  label="Start Date & Time"
                  type="datetime-local"
                  required
                  error={errors.startDateTime?.message}
                  // icon={<Calendar className="w-4 h-4" />}
                  {...register("startDateTime")}
                />
              </div>

              <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
                <InputField
                  id="endDateTime"
                  label="End Date & Time"
                  type="datetime-local"
                  required
                  error={errors?.endDateTime?.message}
                  // icon={<Clock className="w-4 h-4" />}
                  {...register("endDateTime")}
                />
              </div>

              {/* Event Type */}
              <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <Label className="text-sm text-zinc-300 block mb-4  items-center gap-2">
                  {/* <MapPin className="w-4 h-4 text-white-400" /> */}
                  Event Type <span className="text-red-400">*</span>
                </Label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
                    >
                      <div className="relative">
                        <RadioGroupItem
                          value="physical"
                          id="physical"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="physical"
                          className="flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-zinc-800/50 backdrop-blur-md border border-white/10 cursor-pointer transition-all duration-200 peer-checked:border-purple-400/50 peer-checked:bg-purple-400/10 hover:border-purple-400/30 hover:bg-purple-400/5 text-sm sm:text-base"
                        >
                          {/* <Building className="w-4 h-4 sm:w-5 sm:h-5 text-white-400" /> */}
                          <span className="font-medium ">Physical</span>
                        </Label>
                      </div>
                      <div className="relative">
                        <RadioGroupItem
                          value="online"
                          id="online"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="online"
                          className="flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-zinc-800/50 backdrop-blur-md border border-white/10 cursor-pointer transition-all duration-200 peer-checked:border-purple-400/50 peer-checked:bg-purple-400/10 hover:border-purple-400/30 hover:bg-purple-400/5 text-sm sm:text-base"
                        >
                          {/* <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" /> */}
                          <span className="font-medium">Online</span>
                        </Label>
                      </div>
                      <div className="relative sm:col-span-1">
                        <RadioGroupItem
                          value="hybrid"
                          id="hybrid"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="hybrid"
                          className="flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-zinc-800/50 backdrop-blur-md border border-white/10 cursor-pointer transition-all duration-200 peer-checked:border-purple-400/50 peer-checked:bg-purple-400/10 hover:border-purple-400/30 hover:bg-purple-400/5 text-sm sm:text-base"
                        >
                          {/* <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" /> */}
                          <span className="font-medium">Hybrid</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>

              {/* Location Details */}
              {(locationType === "physical" || locationType === "hybrid") && (
                <>
                  <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
                    <InputField
                      id="venue"
                      label="Venue Name"
                      type="text"
                      placeholder="Enter venue name"
                      icon={<Building className="w-4 h-4" />}
                      required
                      error={errors?.venueName?.message}
                      {...register("venueName")}
                    />
                  </div>
                  <div className="sm:col-span-1 lg:col-span-2 xl:col-span-2">
                    <InputField
                      id="address"
                      label="Address"
                      type="text"
                      placeholder="Enter full address"
                      icon={<MapPin className="w-4 h-4" />}
                      required
                      error={errors?.address?.message}
                      {...register("address")}
                    />
                  </div>
                </>
              )}

              {(locationType === "online" || locationType === "hybrid") && (
                <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                  <InputField
                    id="onlineLink"
                    label="Online Meeting Link"
                    type="url"
                    placeholder="https://zoom.us/j/..."
                    icon={<Globe className="w-4 h-4" />}
                    required
                    error={errors?.onlineLink?.message}
                    {...register("onlineLink")}
                  />
                </div>
              )}

              {/* Host Information */}
              <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
                <InputField
                  id="hostName"
                  label="Host Name"
                  type="text"
                  placeholder="Your name or organization"
                  icon={<User className="w-4 h-4" />}
                  required
                  error={errors?.hostName?.message}
                  {...register("hostName")}
                />
              </div>

              <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
                <InputField
                  id="contactEmail"
                  label="Contact Email"
                  type="email"
                  placeholder="contact@example.com"
                  icon={<Mail className="w-4 h-4" />}
                  required
                  error={errors?.contactEmail?.message}
                  {...register("contactEmail")}
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-1 xl:col-span-4">
                <InputField
                  id="contactPhone"
                  label="Contact Phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  icon={<Phone className="w-4 h-4" />}
                  error={errors?.contactPhone?.message}
                  {...register("contactPhone")}
                />
              </div>

              {/* Pricing Toggle */}
              <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 bg-zinc-800/50 backdrop-blur-md rounded-xl border border-white/10 gap-4 sm:gap-0">
                  <div className="flex items-center gap-3">
                    {/* <BadgeIndianRupee className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" /> */}
                    <div>
                      <Label className="text-base sm:text-lg font-semibold text-white">
                        Paid Event
                      </Label>
                      <p className="text-xs sm:text-sm text-gray-300">
                        Toggle if this is a paid event
                      </p>
                    </div>
                  </div>
                  <Controller
                    control={control}
                    name="isPaidEvent"
                    render={({ field }) => (
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500"
                      />
                    )}
                  />
                </div>
              </div>

              {/* Pricing Details */}
              {watch("isPaidEvent") && (
                <>
                  <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
                    <InputField
                      id="price"
                      label="Ticket Price"
                      type="number"
                      placeholder="0"
                      icon={<IndianRupee className="w-4 h-4" />}
                      {...register("price")}
                      error={errors?.price?.message}
                    />
                  </div>
                  <div className="sm:col-span-1 lg:col-span-1 xl:col-span-2">
                    <InputField
                      id="quantity"
                      label="Available Tickets"
                      type="number"
                      placeholder="100"
                      icon={<Tag className="w-4 h-4" />}
                      {...register("quantity")}
                      error={errors?.quantity?.message}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-[#1e1e1e]/60 backdrop-blur-md border-white/20 text-gray-300 hover:bg-[#1e1e1e]/80 hover:text-white hover:border-white/30 transition-all duration-200"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {mutation.isPending ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Event
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
