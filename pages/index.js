import { IoMdAdd } from "react-icons/io";
import ProductCard from "./components/ProductCard";
import Link from "next/link";
import Head from "next/head";
export default function Home({ products, error }) {
  if (error) {
    return <div className="p-4">Error: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>Featured Products - E-commerce Store</title>
        <meta
          name="description"
          content="Explore the best products from various categories at our online store. Find amazing deals and shop the latest products."
        />
        <meta
          name="keywords"
          content="e-commerce, online shopping, best deals, products, featured items, buy products online men's clothing jewelery electronics women's clothing"
        />
      </Head>
      <div className="w-full max-w-[1300px] mx-auto px-4 py-12">
        <nav className="flex flex-wrap justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-center">Featured Products</h1>
          <Link
            href="/product/new"
            className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 px-6 py-3 rounded-lg transition-all duration-200 font-medium inline-flex items-center space-x-2"
          >
            <IoMdAdd />
            <span className="text-emerald-400">New Product</span>
          </Link>
        </nav>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-8 items-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              productImage={product.image}
              productTitle={product.title}
              productPrice={product.price}
              description={product.description}
              category={product.category}
              rate={product.rating.rate}
              count={product.rating.count}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const products = await res.json();

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
        products: [],
      },
    };
  }
}
