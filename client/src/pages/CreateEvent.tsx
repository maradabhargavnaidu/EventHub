import type React from "react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { FormValidator } from "../utils/FormValidator";
import { eventSchema } from "../validations/Events";
import axios from "axios";
import Button from "../utils/Button";
import Input from "../utils/Input";
import Sidebar from "../components/Sidebar";

function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-zinc-700 bg-[#1e1e1e] px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-medium text-white mb-2 block", className)}
      {...props}
    />
  );
}

function RadioGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex gap-6", className)} {...props} />;
}

function RadioItem({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-white border-zinc-700 bg-[#1e1e1e] focus:ring-zinc-600"
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium text-white">
        {label}
      </label>
    </div>
  );
}

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("offline");
  const [address, setAddress] = useState("");
  const [url, setUrl] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("clicked");
    e.preventDefault();
    const eventData = {
      title,
      description,
      dateTime: date,
      type: eventType,
      ...(eventType === "offline" && { address }),
      ...(eventType === "online" && { url }),
      amount,
    };
    const token = localStorage.getItem("token");
    const isValid = await FormValidator(eventSchema, eventData);
    if (isValid && token) {
      try {
        const data = await axios.post(
          "https://eventhub-qrau.onrender.com/api/events/create-event",
          eventData,
          {
            headers: {
              authorization: token,
            },
          }
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Form not valid");
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white pt-14 pb-20">
      <Sidebar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Event</h1>
          <p className="text-zinc-400 mt-2">
            Fill in the details below to create your event
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Event Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your event"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="date">Event Date & Time</Label>
            <Input
              id="date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">Event Amount</Label>
            <Input
              id="amount"
              placeholder="Enter Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Event Type</Label>
            <RadioGroup>
              <RadioItem
                id="offline"
                label="In-person Event"
                checked={eventType === "offline"}
                onChange={() => setEventType("offline")}
              />
              <RadioItem
                id="online"
                label="Online Event"
                checked={eventType === "online"}
                onChange={() => setEventType("online")}
              />
            </RadioGroup>
          </div>
          {eventType === "offline" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Event Location</Label>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Event address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required={eventType === "offline"}
                />
              </div>
            </div>
          )}
          {eventType === "online" && (
            <div>
              <Label htmlFor="online-url">Event URL</Label>
              <Input
                id="online-url"
                placeholder="https://zoom.us/j/123456789"
                onChange={(e) => setUrl(e.target.value)}
                required={eventType === "online"}
              />
              <p className="text-sm text-zinc-500 mt-1">
                Add the link where attendees can join your online event
              </p>
            </div>
          )}
          <div className="pt-4">
            <Button type="submit" className="w-full">
              Create Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
