import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Premium Mechanical Keyboards</h1>
          <p className="text-xl mb-8">Discover the perfect typing experience</p>
          <Link 
            href="/ecomerce/products"
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Keyboard Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Mechanical', 'Wireless', 'Gaming'].map((category) => (
            <div key={category} className="group relative h-64 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gray-900/60 group-hover:bg-gray-900/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">{category}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200" />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Premium Keyboard {item}</h3>
                  <p className="text-gray-600 mb-4">High-quality mechanical switches</p>
                  <p className="text-xl font-bold">$199.99</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
            <p className="text-xl mb-6">Get 20% off on your first purchase!</p>
            <Link 
              href="/ecomerce/products"
              className="inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
