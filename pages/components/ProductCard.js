import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import PopUp from "./PopUp";
import Link from "next/link";
import Image from "next/image";
const ProductCard = ({
  productId,
  productImage,
  productTitle,
  productPrice,
  description,
  category,
  rate,
  count,
}) => {
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest(".ignore-click")) {
        return;
      }
      setOpenPopUp(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openPopUp]);
  const toggleTitle = () => {
    setShowFullTitle(!showFullTitle);
  };

  const handleOpenPopUp = () => {
    setOpenPopUp(!openPopUp);
  };
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="w-5 h-5 text-amber-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FaStarHalfAlt key={i} className="w-5 h-5 text-amber-400" />
        );
      } else {
        stars.push(<FaRegStar key={i} className="w-5 h-5 text-gray-600" />);
      }
    }
    return stars;
  };
  return (
    <li className="relative max-w-[400px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-12 hover:bg-gray-800/90 transition-all duration-300 hover:-translate-y-2 shadow-2xl">
      {openPopUp && (
        <PopUp
          productId={productId}
          productImage={productImage}
          productTitle={productTitle}
          productPrice={productPrice}
          description={description}
          category={category}
        />
      )}
      <IoIosSettings
        onClick={handleOpenPopUp}
        className="absolute right-4 top-3 cursor-pointer ignore-click"
        fontSize={22}
        aria-label="Open settings"
      />
      <div className="absolute z-10 top-3 left-4 bg-emerald-500/20 px-3 py-1 rounded-full text-xs text-emerald-400 font-medium">
        {category}
      </div>

      <div className="mb-6 w-full h-[300px] rounded-xl mx-auto overflow-hidden relative">
        <Image
          src={productImage}
          alt={`${productTitle} - Buy Now at $${productPrice}`}
          width={400}
          height={300}
          className="object-contain"
          priority={false}
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="pr-2">
            <h3 className="text-lg font-bold text-gray-100 mb-1">
              {showFullTitle
                ? productTitle
                : productTitle.slice(0, 20) +
                  (productTitle.length > 20 ? "..." : "")}
            </h3>
            {productTitle.length > 20 && (
              <button
                onClick={toggleTitle}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium cursor-pointer"
                aria-label={
                  showFullTitle ? "Show less title" : "Show more title"
                }
              >
                {showFullTitle ? "Show less" : "Show more"}
              </button>
            )}
          </div>
          <p className="text-2xl font-black text-emerald-400 shrink-0">
            ${productPrice}
          </p>
        </div>

        <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">{renderStars()}</div>
            <span className="text-sm text-gray-400">({count} review)</span>
          </div>
          <Link href={`/product/${productId}`}>
            <button
              className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg transition-colors duration-200 font-medium cursor-pointer"
              aria-label="View product"
            >
              View
            </button>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
