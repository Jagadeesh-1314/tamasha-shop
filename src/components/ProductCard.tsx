import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Star, ArrowUpRight, Check } from "lucide-react";
import { useDispatch } from "react-redux";

import type { Product } from "../types/product";
import type { AppDispatch } from "../app/store";
import { addToCart } from "../features/cart/cartSlice";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [added, setAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (product.stock > 0) {
            dispatch(addToCart(product));
        }
        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 1200);
    };


    const isOutOfStock = product.stock === 0;

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#201d1a]/10 bg-white shadow-[0_8px_0_#201d1a08] transition-all duration-300 hover:-translate-y-1 hover:border-[#e96b4c]/60 hover:shadow-[0_14px_0_#e96b4c22]">
            {/* Media Box */}
            <Link to={`/product/${product.id}`} className="relative block overflow-hidden">
                <div className="relative aspect-4/3 w-full overflow-hidden bg-[#eee8df]">
                    <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay for visual warmth */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#201d1a]/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Top Badges */}
                    <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
                        <span className="rounded-full bg-[#f7f4ef]/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#201d1a] shadow-sm backdrop-blur-md border border-white/40">
                            {product.category}
                        </span>

                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7f4ef]/90 text-[#201d1a] opacity-0 shadow-md backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-105">
                            <ArrowUpRight size={16} />
                        </span>
                    </div>

                    {/* Out of stock tint */}
                    {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px]">
                            <span className="rounded-full bg-[#e96b4c] px-3 py-1 text-xs font-bold text-[#201d1a] shadow-md">
                                Sold Out
                            </span>
                        </div>
                    )}
                </div>
            </Link>

            {/* Content Body */}
            <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                    {/* Rating & Stock */}
                    <div className="mb-2 flex items-center justify-between text-xs">
                        <div className="inline-flex items-center gap-1 rounded-full bg-[#f3c969]/25 px-2 py-0.5 font-bold text-[#8d6b13] border border-[#f3c969]/40">
                            <Star size={12} className="fill-[#d39d1b] text-[#d39d1b]" />
                            <span>{product.rating.rate.toFixed(1)}</span>
                        </div>

                        {!isOutOfStock && (
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#4b9b73] animate-pulse" />
                                {product.rating.count} available
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <Link to={`/product/${product.id}`} className="group/title">
                        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-[#201d1a] transition-colors group-hover/title:text-[#c34d31]">
                            {product.title}
                        </h3>
                    </Link>

                    {/* Description */}
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#201d1a]/55">
                        {product.description}
                    </p>
                </div>

                {/* Pricing & Actions */}
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#201d1a]/10 pt-4">
                    <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#201d1a]/40">
                            From
                        </span>
                        <p className="text-xl font-bold tracking-tight text-[#201d1a]">
                            ${product.price.toFixed(2)}
                        </p>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        className={`group/btn relative flex h-10 items-center gap-2 rounded-xl px-4 text-xs font-bold shadow-sm transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:bg-[#eee8df] disabled:text-[#201d1a]/35 disabled:shadow-none ${added
                                ? "bg-[#4caf50] text-white hover:bg-[#4caf50]"
                                : "bg-[#201d1a] text-white hover:bg-[#e96b4c] hover:text-[#201d1a] hover:shadow-md"
                            }`}
                    >
                        <span
                            className={`flex items-center justify-center transition-all duration-300 ${added ? "scale-100 rotate-0" : "scale-100"
                                }`}
                        >
                            {added ? (
                                <Check
                                    size={15}
                                    strokeWidth={3}
                                    className="animate-[check-pop_0.35s_ease-out]"
                                />
                            ) : (
                                <ShoppingBag
                                    size={15}
                                    className="transition-transform group-hover/btn:-translate-y-0.5"
                                />
                            )}
                        </span>

                        <span>{added ? "Added!" : "Add to Cart"}</span>
                    </button>
                </div>
            </div>
        </article>
    );
}

export default memo(ProductCard);