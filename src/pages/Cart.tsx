import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../app/store";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";

function Cart() {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  // Total number of products
  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cartItems]);

  // Total price
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f4ef]">

        <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-4xl items-center justify-center px-4 py-12 sm:px-6">
          <div className="w-full rounded-2xl border border-[#201d1a]/10 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f3c969]/30">
              <ShoppingBag
                size={34}
                className="text-[#8d6b13]"
              />
            </div>

            <h1 className="mt-7 text-4xl font-bold tracking-tight text-[#201d1a]">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-[#201d1a]/55">
              Looks like you haven't added anything yet.
              Discover something you'll love.
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#201d1a] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#e96b4c] hover:text-[#201d1a]"
            >
              <ArrowLeft size={17} />
              Continue shopping
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="shop-grid min-h-screen bg-[#f7f4ef]">

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e96b4c]">
            Shopping bag
          </p>

          <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-[#201d1a]">
                Your cart
              </h1>

              <p className="mt-2 text-[#201d1a]/55">
                Review your items before checkout.
              </p>
            </div>

            <p className="text-sm font-bold text-[#201d1a]/45">
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Cart items */}
          <section className="space-y-4">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-[#201d1a]/10 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex gap-4 sm:gap-6">
                  {/* Product image */}
                  <Link
                    to={`/product/${item.id}`}
                    className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#eee8df] sm:h-36 sm:w-36"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition hover:scale-105"
                    />
                  </Link>

                  {/* Product details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          to={`/product/${item.id}`}
                          className="line-clamp-2 text-lg font-bold text-[#201d1a] transition hover:text-[#c34d31] sm:text-xl"
                        >
                          {item.title}
                        </Link>

                        <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#201d1a]/40">
                          {item.category}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          dispatch(
                            removeFromCart(item.id)
                          )
                        }
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#201d1a]/35 transition hover:bg-[#fce3dc] hover:text-[#c34d31]"
                        aria-label={`Remove ${item.title}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      {/* Quantity */}
                      <div>
                          <p className="mb-1.5 text-xs font-bold text-[#201d1a]/40">
                          Quantity
                        </p>

                          <div className="flex w-fit items-center rounded-xl border border-[#201d1a]/10 bg-[#f7f4ef] p-1">
                          <button
                            onClick={() =>
                              dispatch(
                                decreaseQuantity(item.id)
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#201d1a]/70 shadow-sm transition hover:bg-[#eee8df] disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="w-10 text-center text-sm font-bold text-[#201d1a]">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              dispatch(
                                increaseQuantity(item.id)
                              )
                            }
                            disabled={
                              item.quantity >= item.stock
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#201d1a]/70 shadow-sm transition hover:bg-[#eee8df] disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="Increase quantity"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        <p className="mt-1.5 text-xs text-[#201d1a]/40">
                          {item.stock} available
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-left sm:text-right">
                        <p className="text-lg font-bold text-[#201d1a]">
                          $
                          {(
                            item.price * item.quantity
                          ).toFixed(2)}
                        </p>

                        <p className="text-xs text-[#201d1a]/40">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Summary */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#201d1a]/10 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#201d1a]">
                Order summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#201d1a]/55">
                    Items
                  </span>

                  <span className="font-bold text-[#201d1a]">
                    {totalItems}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#201d1a]/55">
                    Subtotal
                  </span>

                  <span className="font-bold text-[#201d1a]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#201d1a]/55">
                    Shipping
                  </span>

                  <span className="font-bold text-[#4b9b73]">
                    Free
                  </span>
                </div>
              </div>

              <div className="my-6 border-t border-[#201d1a]/10" />

              <div className="flex items-center justify-between">
                <span className="font-bold text-[#201d1a]">
                  Total
                </span>

                <span className="text-2xl font-bold text-[#201d1a]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <button
                disabled
                className="mt-6 w-full cursor-not-allowed rounded-xl bg-[#eee8df] px-5 py-4 text-sm font-bold text-[#201d1a]/40"
              >
                Checkout unavailable
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-[#201d1a]/40">
               To be Implemented.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Cart;