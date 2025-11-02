import React from 'react';
import { useRouter } from 'next/router';
import { PropertyProps } from '@/interfaces';
import Pill from '@/components/common/Pill';

interface PropertyCardProps {
  property: PropertyProps;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const router = useRouter();

  const handleClick = () => {
    if (property.id) {
      router.push(`/property/${property.id}`);
    }
  };
  const {
    name,
    address,
    rating,
    category,
    price,
    offers,
    image,
    discount
  } = property;

  const discountedPrice = discount 
    ? price - (price * parseFloat(discount) / 100)
    : null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div 
      className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover"
        />
        {discount && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
            -{discount}%
          </div>
        )}
        {rating && (
          <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-md flex items-center gap-1">
            <svg 
              className="w-4 h-4 text-yellow-400 fill-current" 
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Location */}
        <div className="text-gray-600 text-sm mb-2">
          {address.city}, {address.state}, {address.country}
        </div>

        {/* Property Name */}
        <h3 className="font-semibold text-lg mb-2 text-gray-900">{name}</h3>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {category.slice(0, 3).map((cat, index) => (
            <Pill key={index} label={cat} />
          ))}
        </div>

        {/* Property Features */}
        <div className="flex items-center gap-4 text-gray-600 text-sm mb-3">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{offers.bed} bed</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{offers.shower} bath</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{offers.occupants} guests</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 pt-3 border-t">
          {discountedPrice ? (
            <>
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(discountedPrice)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(price)}
              </span>
              <span className="text-sm text-red-500 font-semibold">
                Save {formatPrice(price - discountedPrice)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(price)}
            </span>
          )}
          <span className="text-sm text-gray-600 ml-auto">/ night</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;