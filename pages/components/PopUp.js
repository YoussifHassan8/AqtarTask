import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

const PopUp = ({
  productId,
  productImage,
  productTitle,
  productPrice,
  description,
  category,
}) => {
  const router = useRouter();
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(`Product ${result.id} deleted successfully`);
        router.push("/");
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="absolute right-0 top-10 z-50 w-48 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
      <div className="p-2 space-y-2">
        <Link
          href={`/product/edit/${productId}?name=${productTitle}&price=${productPrice}&description=${description}&image=${productImage}&category=${category}`}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
          aria-label="Edit product"
        >
          <FaEdit className="text-emerald-400 w-4 h-4" />
          <span className="text-gray-300 font-medium">Edit</span>
        </Link>

        <button
          onClick={handleDelete}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-500/20 rounded-lg transition-colors duration-200 cursor-pointer"
          aria-label="Delete product"
        >
          <MdDelete className="text-red-400 w-5 h-5" />
          <span className="text-red-400 font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default PopUp;
