import type React from "react";

import { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

// Custom Button Component
function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 disabled:opacity-50",
        {
          "bg-white text-black hover:bg-zinc-200": variant === "default",
          "border border-zinc-700 bg-transparent hover:bg-zinc-800 text-white":
            variant === "outline",
          "bg-transparent hover:bg-zinc-800 text-white": variant === "ghost",
          "h-10 px-4 py-2": size === "default",
          "h-9 px-3": size === "sm",
          "h-11 px-8": size === "lg",
          "h-10 w-10 p-0": size === "icon",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Custom Input Component
function Input({
  className,
  type = "text",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-zinc-700 bg-[#1e1e1e] px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

// Custom Textarea Component
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

// Custom Label Component
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

// Custom Radio Component
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

// Google Maps Component
function GoogleMap({
  apiKey,
  selectedLocation,
  onLocationSelect,
}: {
  apiKey: string;
  selectedLocation: { lat: number; lng: number } | null;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Google Maps API
  useEffect(() => {
    if (!window.google && !document.getElementById("google-maps-script")) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    } else if (typeof window.google !== "undefined") {
      setIsLoaded(true);
    }
  }, [apiKey]);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const initialLocation = selectedLocation || {
      lat: 37.7749,
      lng: -122.4194,
    }; // Default to San Francisco

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: initialLocation,
      zoom: 13,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
    });

    setMap(mapInstance);

    // Create marker if location is selected
    if (selectedLocation) {
      const markerInstance = new window.google.maps.Marker({
        position: selectedLocation,
        map: mapInstance,
        draggable: true,
      });

      window.google.maps.event.addListener(markerInstance, "dragend", () => {
        const position = markerInstance.getPosition();
        if (position) {
          onLocationSelect({ lat: position.lat(), lng: position.lng() });
        }
      });

      setMarker(markerInstance);
    }

    // Add click event to map
    window.google.maps.event.addListener(
      mapInstance,
      "click",
      (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const clickedLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };

          onLocationSelect(clickedLocation);

          if (marker) {
            marker.setPosition(clickedLocation);
          } else {
            const newMarker = new window.google.maps.Marker({
              position: clickedLocation,
              map: mapInstance,
              draggable: true,
            });

            window.google.maps.event.addListener(newMarker, "dragend", () => {
              const position = newMarker.getPosition();
              if (position) {
                onLocationSelect({ lat: position.lat(), lng: position.lng() });
              }
            });

            setMarker(newMarker);
          }
        }
      }
    );
  }, [isLoaded, selectedLocation, onLocationSelect]);

  // Initialize search box
  useEffect(() => {
    if (!isLoaded || !map) return;

    const input = document.getElementById("map-search") as HTMLInputElement;
    if (!input) return;

    const searchBoxInstance = new window.google.maps.places.SearchBox(input);
    setSearchBox(searchBoxInstance);

    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(input);

    // Listen for the event fired when the user selects a prediction
    searchBoxInstance.addListener("places_changed", () => {
      const places = searchBoxInstance.getPlaces();
      if (!places || places.length === 0) return;

      const place = places[0];
      if (!place.geometry || !place.geometry.location) return;

      // If the place has a geometry, center the map on it
      map.setCenter(place.geometry.location);
      map.setZoom(17);

      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      onLocationSelect(location);

      if (marker) {
        marker.setPosition(location);
      } else {
        const newMarker = new window.google.maps.Marker({
          position: location,
          map,
          draggable: true,
        });

        window.google.maps.event.addListener(newMarker, "dragend", () => {
          const position = newMarker.getPosition();
          if (position) {
            onLocationSelect({ lat: position.lat(), lng: position.lng() });
          }
        });

        setMarker(newMarker);
      }
    });

    // Bias the SearchBox results towards current map's viewport
    map.addListener("bounds_changed", () => {
      searchBoxInstance.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });
  }, [isLoaded, map, onLocationSelect]);

  // Update marker when selectedLocation changes
  useEffect(() => {
    if (!isLoaded || !map || !selectedLocation) return;

    if (marker) {
      marker.setPosition(selectedLocation);
    } else {
      const newMarker = new window.google.maps.Marker({
        position: selectedLocation,
        map,
        draggable: true,
      });

      window.google.maps.event.addListener(newMarker, "dragend", () => {
        const position = newMarker.getPosition();
        if (position) {
          onLocationSelect({ lat: position.lat(), lng: position.lng() });
        }
      });

      setMarker(newMarker);
    }

    map.setCenter(selectedLocation);
    map.setZoom(17);
  }, [isLoaded, map, selectedLocation, marker, onLocationSelect]);

  return (
    <div className="relative w-full h-[400px] rounded-md overflow-hidden">
      <input
        id="map-search"
        type="text"
        placeholder="Search for a location"
        className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 w-[90%] h-10 px-3 py-2 rounded-md border border-zinc-700 bg-[#1e1e1e] text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600"
      />
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("offline");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [address, setAddress] = useState("");
  const [isGettingCurrentLocation, setIsGettingCurrentLocation] =
    useState(false);

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingCurrentLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(currentLocation);

        // Reverse geocode to get address
        if (window.google) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: currentLocation }, (results, status) => {
            if (status === "OK" && results && results[0]) {
              setAddress(results[0].formatted_address);
            }
          });
        }

        setIsGettingCurrentLocation(false);
      },
      (error) => {
        alert(`Error getting location: ${error.message}`);
        setIsGettingCurrentLocation(false);
      },
      { enableHighAccuracy: true }
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create event object
    const eventData = {
      title,
      description,
      date,
      type: eventType,
      location:
        eventType === "offline" ? { address, coordinates: location } : null,
    };

    console.log("Event data:", eventData);
    // Here you would typically send this data to your API

    alert("Event created successfully!");
    // Redirect to events page or clear form
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white pt-14">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Event</h1>
          <p className="text-zinc-400 mt-2">
            Fill in the details below to create your event
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
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

          {/* Description */}
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

          {/* Date */}
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

          {/* Event Type */}
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

          {/* Location (only for offline events) */}
          {eventType === "offline" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Event Location</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={getCurrentLocation}
                  disabled={isGettingCurrentLocation}
                >
                  {isGettingCurrentLocation ? (
                    <span>Getting location...</span>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="1" />
                        <line x1="12" x2="12" y1="8" y2="16" />
                        <line x1="8" x2="16" y1="12" y2="12" />
                      </svg>
                      Use Current Location
                    </>
                  )}
                </Button>
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

              <div>
                <Label>Select on Map</Label>
                <p className="text-sm text-zinc-400 mb-2">
                  Search for a location or click on the map to set your event
                  location
                </p>
                <GoogleMap
                  apiKey="YOUR_GOOGLE_MAPS_API_KEY" // Replace with your actual API key
                  selectedLocation={location}
                  onLocationSelect={(loc) => {
                    setLocation(loc);
                    // Reverse geocode to get address
                    if (window.google) {
                      const geocoder = new window.google.maps.Geocoder();
                      geocoder.geocode({ location: loc }, (results, status) => {
                        if (status === "OK" && results && results[0]) {
                          setAddress(results[0].formatted_address);
                        }
                      });
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Online Event URL (only for online events) */}
          {eventType === "online" && (
            <div>
              <Label htmlFor="online-url">Event URL</Label>
              <Input
                id="online-url"
                placeholder="https://zoom.us/j/123456789"
                required={eventType === "online"}
              />
              <p className="text-sm text-zinc-500 mt-1">
                Add the link where attendees can join your online event
              </p>
            </div>
          )}

          {/* Submit Button */}
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
