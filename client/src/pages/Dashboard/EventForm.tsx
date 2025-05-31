import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserProfileSnapshot from "@/components/dashboard/UserProfileSnapShot";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  Plus,
  X,
  Globe,
  Building,
  UserCircle,
  BadgeIndianRupee,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "@/validations/Events";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function InputField({
  id,
  label,
  type,
  placeholder,
  icon,
  required,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-200">
        {label} {required && <span className="text-red-400 text-xl">*</span>}
      </Label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        {type === "textarea" ? (
          <Textarea
            id={id}
            placeholder={placeholder}
            className={`bg-[#2a2a2a] border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 ${
              icon ? "pl-10" : ""
            }`}
            rows={4}
            value={value}
            onChange={onChange}
          />
        ) : (
          <Input
            id={id}
            type={type}
            placeholder={placeholder}
            className={`bg-[#2a2a2a] border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 ${
              icon ? "pl-10" : ""
            }`}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}
export interface TicketType {
  ticketName: string;
  price: number;
  quantity: number;
}

export interface EventFormData {
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;

  type: "online" | "physical" | "hybrid";

  venueName?: string;
  address?: string;
  onlineLink?: string;

  hostName: string;
  contactEmail: string;
  contactPhone?: string;

  isPaidEvent: boolean;

  tickets: TicketType[]; // now it's an array
}

export default function EventForm() {
  const {
    register,
    // handleSubmit,
    // formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(eventSchema),
  });
  const locationType = watch("type");
  const [tickets, setTickets] = useState([
    { id: 1, name: "General Admission", price: "0", quantity: "100" },
  ]);

  const addTicketType = () => {
    const newTicket = {
      id: Date.now(),
      name: "",
      price: "0",
      quantity: "50",
    };
    setTickets([...tickets, newTicket]);
  };

  const removeTicketType = (id: number) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  const updateTicket = (id: number, field: string, value: string) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100">
      <div className="container mx-auto p-6 ">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-5">
            <SidebarTrigger className="cursor-pointer" />
            <h3 className="text-xl font-bold">Create Event</h3>
          </div>
          <UserProfileSnapshot />
        </div>

        <form className="space-y-8">
          <Card className="bg-[#2a2a2a] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-white " />
                Basic Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <InputField
                id="title"
                label="Event Title"
                type="text"
                placeholder="Enter your event title"
                required
                {...register("title")}
              />
              <InputField
                id="description"
                label="Event Description"
                type="textarea"
                placeholder="Describe your event in detail..."
                required
                {...register("description")}
              />
            </CardContent>
          </Card>

          <Card className="bg-[#2a2a2a] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-white" />
                Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  id="startDateTime"
                  label="Start Date & Time"
                  type="datetime-local"
                  required
                  {...register("startDateTime")}
                />
                <InputField
                  id="endDateTime"
                  label="End Date & Time"
                  type="datetime-local"
                  required
                  {...register("endDateTime")}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2a2a2a] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-200 mb-3 block">
                  Event Type <span className="text-red-400 text-xl">*</span>
                </Label>
                <RadioGroup className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg text-white bg-[#1e1e1e] border border-gray-600">
                    <RadioGroupItem
                      value="physical"
                      id="physical"
                      {...register("type")}
                    />
                    <Label
                      htmlFor="physical"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Building className="w-4 h-4" />
                      Physical Location
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg text-white bg-[#1e1e1e] border border-gray-600">
                    <RadioGroupItem
                      value="online"
                      id="online"
                      {...register("type")}
                    />
                    <Label
                      htmlFor="online"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Globe className="w-4 h-4" />
                      Online Event
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg text-white bg-[#1e1e1e] border border-gray-600">
                    <RadioGroupItem
                      value="hybrid"
                      id="hybrid"
                      {...register("type")}
                    />
                    <Label
                      htmlFor="hybrid"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <MapPin className="w-4 h-4" />
                      Hybrid (Physical + Online)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {(locationType === "physical" || locationType === "hybrid") && (
                <div className="space-y-4">
                  <InputField
                    id="venue"
                    label="Venue Name"
                    type="text"
                    placeholder="Enter venue name"
                    icon={<Building className="w-4 h-4" />}
                    required
                    {...register("venueName")}
                  />
                  <InputField
                    id="address"
                    label="Address"
                    type="text"
                    placeholder="Enter full address"
                    icon={<MapPin className="w-4 h-4" />}
                    required
                    {...register("address")}
                  />
                </div>
              )}

              {(locationType === "online" || locationType === "hybrid") && (
                <InputField
                  id="onlineLink"
                  label="Online Meeting Link"
                  type="url"
                  placeholder="https://zoom.us/j/..."
                  icon={<Globe className="w-4 h-4" />}
                  required
                  {...register("onlineLink")}
                />
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#2a2a2a] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-white" />
                Host Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  id="hostName"
                  label="Host Name"
                  type="text"
                  placeholder="Your name or organization"
                  icon={<User className="w-4 h-4" />}
                  required
                  {...register("hostName")}
                />
                <InputField
                  id="contactEmail"
                  label="Contact Email"
                  type="email"
                  placeholder="contact@example.com"
                  icon={<Mail className="w-4 h-4" />}
                  required
                  {...register("contactEmail")}
                />
              </div>
              <div className="mt-6">
                <InputField
                  id="contactPhone"
                  label="Contact Phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  icon={<Phone className="w-4 h-4" />}
                  {...register("contactPhone")}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2a2a2a] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BadgeIndianRupee className="w-5 h-5 text-white-500" />
                <div>Ticketing & Pricing</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#1e1e1e] rounded-lg border border-gray-600">
                <div>
                  <Label className="text-sm font-medium text-gray-200">
                    Paid Event
                  </Label>
                  <p className="text-xs text-gray-400">
                    Toggle if this is a paid event
                  </p>
                </div>
                <Switch
                // checked={formData.isPaid}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-200">
                    Ticket Types
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTicketType}
                    className="bg-[#1e1e1e] border-gray-600 text-gray-200 hover:bg-gray-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Ticket Type
                  </Button>
                </div>

                {tickets.map((ticket, index) => (
                  <div
                    key={ticket.id}
                    className="p-4 bg-[#1e1e1e] rounded-lg border border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant="secondary"
                        className="bg-blue-600 text-white"
                      >
                        Ticket {index + 1}
                      </Badge>
                      {tickets.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTicketType(ticket.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs text-gray-400">
                          Ticket Name
                        </Label>
                        <Input
                          placeholder="General Admission"
                          value={ticket.name}
                          onChange={(e) =>
                            updateTicket(ticket.id, "name", e.target.value)
                          }
                          className="bg-[#2a2a2a] border-gray-600 text-gray-100 mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-400">
                          Price ($)
                        </Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={ticket.price}
                          onChange={(e) =>
                            updateTicket(ticket.id, "price", e.target.value)
                          }
                          className="bg-[#2a2a2a] border-gray-600 text-gray-100 mt-1"
                          // disabled={!formData.isPaid}
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-400">
                          Quantity
                        </Label>
                        <Input
                          type="number"
                          placeholder="100"
                          value={ticket.quantity}
                          onChange={(e) =>
                            updateTicket(ticket.id, "quantity", e.target.value)
                          }
                          className="bg-[#2a2a2a] border-gray-600 text-gray-100 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center gap-2 bottom-0 bg-[#1e1e1e] p-5 rounded-lg shadow-lg border border-white">
            <Button
              type="button"
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              // disabled={isSubmitting}
              className="inline-flex items-center justify-center px-6 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200 hover:scale-105"
            >
              Create Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
