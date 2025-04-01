import Head from "next/head";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/router";

export default function NewProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to create product");
      }
      alert(`Product created with ID: ${result.id}`);
      router.push("/");
    } catch (error) {
      console.error("Error creating product:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>Create New Product - Admin</title>
        <meta
          name="description"
          content="Add a new product to the store with title, price, category, and image."
        />
        <meta
          name="keywords"
          content="add product, create product, e-commerce, admin panel"
        />
      </Head>
      <div className="min-h-screen bg-gray-900 py-6 px-4">
        <div className="max-w-[800px] mx-auto bg-gray-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-emerald-400 mb-8 text-center">
            Create New Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-6">
              <div className=" flex-1">
                <label className="text-sm font-medium text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400"
                  placeholder="Product title"
                  required
                />
              </div>

              <div className=" flex-1">
                <label className=" text-sm font-medium text-gray-300">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <label className=" text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400"
              placeholder="Product description"
              required
            />

            <div className="flex gap-6">
              <div className="flex-1">
                <label className=" text-sm font-medium text-gray-300">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400"
                  placeholder="Product category"
                  required
                />
              </div>

              <div className="flex-1">
                <label className=" text-sm font-medium text-gray-300">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Create Product</span>
              <IoMdAdd />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
