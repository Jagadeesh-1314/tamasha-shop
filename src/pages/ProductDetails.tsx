import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../app/store";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(
    (state: RootState) => state.products.items
  );

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const product = useMemo(
    () => products.find((item) => item.id === Number(id)),
    [products, id]
  );

  const cartItem = cartItems.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f7f4ef]">
        <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6">
          <div className="w-full rounded-2xl border border-[#201d1a]/10 bg-white p-10 text-center shadow-sm">
            <h1 className="text-2xl font-black text-slate-950">
              Product not found
            </h1>

            <p className="mt-3 text-slate-500">
              This product may no longer be available.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-xl bg-[#201d1a] px-5 py-3 text-sm font-bold text-white hover:bg-[#e96b4c] hover:text-[#201d1a]"
            >
              Back to products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    dispatch(addToCart(product));
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(product.id));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(product.id));
  };

  return (
    <div className="shop-grid min-h-screen bg-[#f7f4ef]">

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#201d1a]/55 transition hover:text-[#201d1a]"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        {/* Product */}
        <div className="grid overflow-hidden rounded-2xl border border-[#201d1a]/10 bg-white shadow-[0_10px_0_#201d1a0a] lg:grid-cols-2">
          {/* Image */}
          <div className="bg-[#eee8df]">
            <div className="flex aspect-square items-center justify-center overflow-hidden lg:aspect-auto lg:h-full">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <span className="w-fit rounded-full bg-[#f3c969]/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#8d6b13]">
              {product.category}
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#201d1a] sm:text-5xl lg:text-6xl">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-2">
              <div className="flex items-center gap-1 text-[#d39d1b]">
                <Star size={18} fill="currentColor" />

                <span className="font-bold">
                  {product.rating.rate.toFixed(1)}
                </span>
              </div>

              <span className="text-sm text-[#201d1a]/45">
                Customer rating
              </span>
            </div>

            {/* Description */}
            <p className="mt-7 leading-8 text-[#201d1a]/60">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-8 border-y border-[#201d1a]/10 py-6">
              <p className="text-4xl font-bold text-[#201d1a]">
                ${product.price.toFixed(2)}
              </p>

              <p
                className={`mt-2 text-sm font-semibold ${
                  product.stock > 0
                    ? "text-[#4b9b73]"
                    : "text-[#c34d31]"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} units available`
                  : "Currently out of stock"}
              </p>
            </div>

            {/* Cart */}
            <div className="mt-8">
              {quantity === 0 ? (
                <button
                  onClick={handleAdd}
                  disabled={product.stock === 0}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#201d1a] px-6 py-4 font-bold text-white transition hover:bg-[#e96b4c] hover:text-[#201d1a] disabled:cursor-not-allowed disabled:bg-[#eee8df] disabled:text-[#201d1a]/35"
                >
                  <ShoppingCart size={19} />

                  {product.stock === 0
                    ? "Out of stock"
                    : "Add to cart"}
                </button>
              ) : (
                <div className="flex items-center justify-between rounded-xl border border-[#201d1a]/10 bg-[#f7f4ef] p-2">
                  <button
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#201d1a]/70 shadow-sm transition hover:bg-[#eee8df] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus size={18} />
                  </button>

                  <div className="text-center">
                    <p className="text-xs font-medium text-[#201d1a]/40">
                      Quantity
                    </p>

                    <p className="text-xl font-bold text-[#201d1a]">
                      {quantity}
                    </p>
                  </div>

                  <button
                    onClick={handleIncrease}
                    disabled={quantity >= product.stock}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#201d1a]/70 shadow-sm transition hover:bg-[#eee8df] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              )}

              {quantity > 0 && (
                <Link
                  to="/cart"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-[#201d1a]/20 px-6 py-4 font-bold text-[#201d1a] transition hover:bg-[#f7f4ef]"
                >
                  View cart
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetails;