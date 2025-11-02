import React from "react";
import { PropertyProps } from "@/interfaces";
import Pill from "@/components/common/Pill";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";

interface PropertyDetailProps {
  property: PropertyProps;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  const router = useRouter();
  
  const {
    name,
    address,
    rating,
    category,
    price,
    offers,
    image,
    discount,
  } = property;

  const discountedPrice = discount
    ? price - (price * parseFloat(discount) / 100)
    : null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleBookNow = () => {
    router.push(`/booking?propertyId=${property.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Property Image */}
      <div className="relative mb-6">
        <img
          src={image}
          alt={name}
          className="w-full h-96 object-cover rounded-lg"
        />
        {discount && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-lg">
            -{discount}%
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Property Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="font-semibold text-lg">{rating}</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">
                {address.city}, {address.state}, {address.country}
              </span>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {category.map((cat, index) => (
                <Pill key={index} label={cat} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6" />

          {/* Property Features */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">About this property</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bedrooms</p>
                  <p className="font-semibold text-lg">{offers.bed}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bathrooms</p>
                  <p className="font-semibold text-lg">{offers.shower}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Guests</p>
                  <p className="font-semibold text-lg">{offers.occupants}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              Experience luxury and comfort in this beautiful {name.toLowerCase()}
              . Located in the heart of {address.city}, {address.state}, this
              property offers an unforgettable stay with all modern amenities.
              Perfect for {offers.occupants} guests, featuring {offers.bed}{" "}
              bedrooms and {offers.shower} bathrooms. Book your stay today!
            </p>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 border rounded-lg shadow-lg p-6 bg-white">
            <div className="mb-4">
              {discountedPrice ? (
                <div>
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(discountedPrice)}
                  </span>
                  <span className="text-lg text-gray-500 line-through ml-2">
                    {formatPrice(price)}
                  </span>
                  <p className="text-sm text-red-600 font-semibold mt-1">
                    Save {formatPrice(price - discountedPrice)}!
                  </p>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(price)}
                </span>
              )}
              <p className="text-gray-600 mt-1">per night</p>
            </div>

            <Button text="Book Now" onClick={handleBookNow} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

