import { BACKEND_URL } from "./api";

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  goals?: string;
  budget?: string;
  timeline?: string;
  scheduled_at: string; // ISO string
  timezone?: string;
}

export async function createBooking(data: BookingData) {
  const res = await fetch(`${BACKEND_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        ...data,
        status: "pending",
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create booking: ${res.statusText}`);
  }

  const json = await res.json();
  return json.data;
}
