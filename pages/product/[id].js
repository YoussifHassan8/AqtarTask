import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

const ProductPage = ({ product, error }) => {
  const router = useRouter();

  const renderStars = (rate) => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="w-6 h-6 text-amber-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FaStarHalfAlt key={i} className="w-6 h-6 text-amber-400" />
        );
      } else {
        stars.push(<FaRegStar key={i} className="w-6 h-6 text-gray-600" />);
      }
    }
    return stars;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-red-500/20 text-red-400 p-8 rounded-xl max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Product</h2>
          <p>{error}</p>
          <button
            onClick={() => router.back()}
            className="mt-6 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.title} - Product Details</title>
        <meta name="description" content={product.description} />
        <meta
          name="keywords"
          content={`${product.category}, buy ${product.title}, online shopping`}
        />
      </Head>
      <div className="min-h-screen bg-gray-900 p-4">
        <div className="max-w-[1000px] mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-8 text-gray-400 hover:text-gray-300 flex items-center gap-2 cursor-pointer"
          >
            <IoIosArrowBack />
            Back to Products
          </button>

          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl lg:flex lg:gap-12">
            <div className="bg-gray-700 rounded-xl p-6 mb-4 w-full">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="w-full h-96 object-contain"
                priority
              />
            </div>

            <div className="space-y-6 mx-auto">
              <div className="bg-emerald-500/20 inline-block px-4 py-1 rounded-full text-sm text-emerald-400 font-medium">
                {product.category}
              </div>

              <h1 className="text-4xl font-bold text-gray-100">
                {product.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  {renderStars(product.rating.rate)}
                  <span className="text-gray-400 text-sm">
                    ({product.rating.count} reviews)
                  </span>
                </div>
                <div className="text-4xl font-black text-emerald-400">
                  ${product.price}
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description}
              </p>

              <button
                className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 py-4 px-8 rounded-xl font-bold text-lg transition-colors duration-200 cursor-pointer"
                aria-label="Add to Cart"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { id } = context.params;
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) {
      throw new Error(`Product not found (Status: ${res.status})`);
    }

    const product = await res.json();

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
        product: null,
      },
    };
  }
}

export default ProductPage;
