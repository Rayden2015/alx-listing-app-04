import type { NextApiRequest, NextApiResponse } from "next";
import { BookingProps } from "@/interfaces";

type Data = 
  | { success: boolean; bookingId: string; message: string }
  | { error: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const bookingData: BookingProps = req.body;

    // Validate required fields
    const requiredFields = [
      "propertyId",
      "firstName",
      "lastName",
      "email",
      "phone",
      "checkIn",
      "checkOut",
      "guests",
      "cardNumber",
      "expirationDate",
      "cvv",
      "billingAddress",
    ];

    for (const field of requiredFields) {
      if (!bookingData[field as keyof BookingProps]) {
        return res.status(400).json({ 
          error: `Missing required field: ${field}` 
        });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Generate a mock booking ID
    const bookingId = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // In a real application, you would save the booking to a database here
    // For now, we'll just return a success response

    res.status(201).json({
      success: true,
      bookingId,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
}

