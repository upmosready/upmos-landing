import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/woocommerce';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images && product.images.length > 0 
    ? product.images[0] 
    : { src: '/placeholder-product.jpg', alt: product.name };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price) || 0);
  };

  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-square bg-slate-100 overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt || product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.on_sale && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
            Sale
          </div>
        )}
        {product.stock_status === 'outofstock' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          {product.on_sale && product.regular_price ? (
            <>
              <span className="text-xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-slate-500 line-through">
                {formatPrice(product.regular_price)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating_count > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(parseFloat(product.average_rating))
                      ? 'text-yellow-400'
                      : 'text-slate-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-slate-600">({product.rating_count})</span>
          </div>
        )}

        {/* Short Description */}
        {product.short_description && (
          <div 
            className="text-sm text-slate-600 mb-4 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
        )}

        {/* View Details Button */}
        <Link
          href={`/product/${product.slug}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
