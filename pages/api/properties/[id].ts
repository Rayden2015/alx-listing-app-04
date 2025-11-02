import type { NextApiRequest, NextApiResponse } from "next";
import { PropertyProps } from "@/interfaces";
import { PROPERTYLISTINGSAMPLE } from "@/constants";

type Data = PropertyProps | { error: string };

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

    // Find property by ID
    const property = PROPERTYLISTINGSAMPLE.find((prop, index) => {
      const propId = prop.id || index + 1;
      return String(propId) === String(id);
    });

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Ensure property has ID
    const propertyWithId = {
      ...property,
      id: property.id || PROPERTYLISTINGSAMPLE.indexOf(property) + 1,
    };

    res.status(200).json(propertyWithId);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch property" });
  }
}

