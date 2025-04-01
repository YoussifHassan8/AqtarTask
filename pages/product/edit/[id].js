import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IoMdCheckmark } from "react-icons/io";

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (router.isReady) {
      setFormData({
        title: router.query.name || "",
        price: router.query.price || "",
        description: router.query.description || "",
        category: router.query.category || "",
        image: router.query.image || "",
      });
    }
  }, [router.isReady, router.query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          price: parseFloat(formData.price),
          description: formData.description,
          image: formData.image,
          category: formData.category,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to edit product");
      }

      alert(`Product ${result.id} edited successfully`);
      router.push("/");
    } catch (error) {
      console.error("Error editing product:", error);
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
        <title>Edit Product - {formData.title || "Loading..."}</title>
        <meta name="description" content={`Edit details for product ${id}`} />
        <meta
          name="keywords"
          content={`${formData.category}, buy ${formData.title}, online shopping`}
        />
      </Head>
      <div className="min-h-screen bg-gray-900 py-6 px-4">
        <div className="max-w-[800px] mx-auto bg-gray-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-emerald-400 mb-8 text-center">
            Edit Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium text-gray-300">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400"
                required
              />
            </div>

            <div className="flex gap-6">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-300">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium text-gray-300">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className=" bg-red-500 rounded-lg px-6 py-2 text-gray-300 hover:text-gray-100 transition-colors font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-500/20 hover:bg-emerald-500/30 px-6 py-2 rounded-lg transition-colors duration-200 font-medium flex items-center space-x-2 cursor-pointer"
              >
                <span>Save Changes</span>
                <IoMdCheckmark />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
