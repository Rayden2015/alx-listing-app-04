import type { NextApiRequest, NextApiResponse } from "next";
import { PropertyProps } from "@/interfaces";
import { PROPERTYLISTINGSAMPLE } from "@/constants";

type Data = PropertyProps[] | { error: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Add IDs to properties if they don't have them
    const propertiesWithIds = PROPERTYLISTINGSAMPLE.map((property, index) => ({
      ...property,
      id: property.id || index + 1,
    }));

    res.status(200).json(propertiesWithIds);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
}

