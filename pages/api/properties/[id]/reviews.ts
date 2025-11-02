import type { NextApiRequest, NextApiResponse } from "next";
import { ReviewProps } from "@/interfaces";

type Data = ReviewProps[] | { error: string };

// Mock reviews data - In a real app, this would come from a database
const MOCK_REVIEWS: ReviewProps[] = [
  {
    id: 1,
    propertyId: 1,
    author: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely amazing stay! The property exceeded all our expectations. Clean, well-maintained, and in a perfect location.",
    date: "2024-01-15",
  },
  {
    id: 2,
    propertyId: 1,
    author: "Michael Chen",
    rating: 4,
    comment: "Great property with beautiful views. The amenities were excellent, and the host was very responsive.",
    date: "2024-01-10",
  },
  {
    id: 3,
    propertyId: 1,
    author: "Emma Williams",
    rating: 5,
    comment: "Perfect for our family vacation. Spacious, clean, and had everything we needed. Would definitely book again!",
    date: "2024-01-05",
  },
  {
    id: 4,
    propertyId: 2,
    author: "David Brown",
    rating: 4,
    comment: "Lovely place with stunning mountain views. Very peaceful and relaxing. The fireplace was a great touch.",
    date: "2024-01-20",
  },
  {
    id: 5,
    propertyId: 2,
    author: "Lisa Anderson",
    rating: 5,
    comment: "Wonderful experience! The property was exactly as described. Highly recommend for anyone looking for a quiet getaway.",
    date: "2024-01-12",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Property ID is required" });
    }

    // Filter reviews by property ID
    const propertyReviews = MOCK_REVIEWS.filter(
      (review) => String(review.propertyId) === String(id)
    );

    // If no reviews found, return empty array instead of error
    res.status(200).json(propertyReviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}

