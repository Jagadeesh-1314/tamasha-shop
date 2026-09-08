import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RotateCcw, PackageSearch } from "lucide-react";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import ProductGrid from "../components/ProductGrid";
import Loader from "../components/Loader";

import type { RootState, AppDispatch } from "../app/store";
import {
    setError,
    setLoading,
    setProducts,
} from "../features/products/productSlice";
import { fetchProducts } from "../services/productApi";

interface ProductsProps {
    searchRequest: number;
}

function Products({ searchRequest }: ProductsProps) {
    const dispatch = useDispatch<AppDispatch>();

    const { items: products, status, error } = useSelector(
        (state: RootState) => state.products
    );

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("default");
    const searchInputRef = useRef<HTMLInputElement>(null);

    const loadProducts = useCallback(async () => {
        dispatch(setLoading());

        try {
            const data = await fetchProducts();
            dispatch(setProducts(data));
        } catch {
            dispatch(
                setError("Unable to load products. Please try again.")
            );
        }
    }, [dispatch]);

    useEffect(() => {
        if (status === "idle") {
            loadProducts();
        }
    }, [status, loadProducts]);

    useEffect(() => {
        if (searchRequest > 0) {
            document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" });
            searchInputRef.current?.focus();
        }
    }, [searchRequest]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search
        if (search.trim()) {
            const query = search.toLowerCase().trim();

            result = result.filter((product) =>
                product.title.toLowerCase().includes(query)
            );
        }

        // Category
        if (category !== "All") {
            result = result.filter(
                (product) =>
                    product.category.toLowerCase() ===
                    category.toLowerCase()
            );
        }

        // Sort
        switch (sort) {
            case "priceAsc":
                result.sort((a, b) => a.price - b.price);
                break;

            case "priceDesc":
                result.sort((a, b) => b.price - a.price);
                break;

            case "rating":
                result.sort((a, b) => b.rating.rate - a.rating.rate);
                break;

            case "name":
                result.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
                break;

            default:
                break;
        }

        return result;
    }, [products, search, category, sort]);

    return (
        <div className="shop-grid min-h-screen bg-[#f7f4ef]">
            <main>
                <Hero />

                <section
                    id="products"
                    className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
                >
                    {/* Section heading */}
                    <div className="mb-8">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e96b4c]">
                            The edit / 2026
                        </p>

                        <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                            <div>
                                <h2 className="text-4xl font-bold tracking-tight text-[#201d1a] sm:text-5xl">
                                    Objects with intent
                                </h2>

                                <p className="mt-3 max-w-md text-[#201d1a]/55">
                                    Practical, playful, and ready to become part of your everyday.
                                </p>
                            </div>

                            {status === "succeeded" && (
                                <p className="text-sm font-medium text-slate-400">
                                    {filteredProducts.length}{" "}
                                    {filteredProducts.length === 1
                                        ? "product"
                                        : "products"}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="space-y-5 rounded-2xl border border-[#201d1a]/10 bg-white/45 p-4 sm:p-5">
                        <SearchBar
                            ref={searchInputRef}
                            value={search}
                            onChange={setSearch}
                        />

                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <CategoryFilter
                                products={products}
                                selected={category}
                                onChange={setCategory}
                            />

                            <SortDropdown
                                value={sort}
                                onChange={setSort}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mt-10">
                        {/* Loading */}
                        {status === "loading" && <Loader />}

                        {/* Error */}
                        {status === "failed" && (
                            <div className="rounded-2xl border border-[#e96b4c]/20 bg-white px-6 py-16 text-center shadow-sm">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fce3dc] text-[#c34d31]">
                                    <RotateCcw size={24} />
                                </div>

                                <h3 className="mt-5 text-xl font-bold text-[#201d1a]">
                                    Something went wrong
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm text-[#201d1a]/55">
                                    {error}
                                </p>

                                <button
                                    onClick={loadProducts}
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#201d1a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e96b4c] hover:text-[#201d1a]"
                                >
                                    <RotateCcw size={17} />
                                    Retry
                                </button>
                            </div>
                        )}

                        {/* Products */}
                        {status === "succeeded" &&
                            filteredProducts.length > 0 && (
                                <ProductGrid products={filteredProducts} />
                            )}

                        {/* Empty state */}
                        {status === "succeeded" &&
                            filteredProducts.length === 0 && (
                                <div className="rounded-2xl border border-[#201d1a]/10 bg-white px-6 py-20 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3c969]/30 text-[#8d6b13]">
                                        <PackageSearch size={25} />
                                    </div>

                                    <h3 className="mt-5 text-xl font-bold text-[#201d1a]">
                                        No products found
                                    </h3>

                                    <p className="mt-2 text-sm text-[#201d1a]/55">
                                        Try changing your search or category filter.
                                    </p>

                                    <button
                                        onClick={() => {
                                            setSearch("");
                                            setCategory("All");
                                        }}
                                        className="mt-6 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                    >
                                        Clear filters
                                    </button>
                                </div>
                            )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Products;