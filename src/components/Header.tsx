import { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useSelector } from "react-redux";

import type { RootState } from "../app/store";

interface HeaderProps {
  onSearchClick?: () => void;
}

function Header({ onSearchClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cartItems]);

  const handleCategoriesClick = () => {
    setMobileMenuOpen(false);

    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#201d1a]/10 bg-[#f7f4ef]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 transition-transform duration-200 active:scale-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e96b4c] text-[#201d1a] shadow-[4px_4px_0_#201d1a] transition-transform duration-300 group-hover:-translate-y-0.5">
            <ShoppingBag
              size={20}
              className="transition-transform duration-300 group-hover:-rotate-6"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#201d1a]">
              Tamasha<span className="text-[#e96b4c]">.</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
                `border-b-2 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                isActive
                  ? "border-[#e96b4c] text-[#201d1a]"
                  : "border-transparent text-[#201d1a]/55 hover:text-[#201d1a]"
              }`
            }
          >
            Shop
          </NavLink>

          <button
            type="button"
            onClick={handleCategoriesClick}
            className="border-b-2 border-transparent px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#201d1a]/55 transition-all duration-200 hover:text-[#201d1a]"
          >
            Categories
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onSearchClick?.();
            }}
            className="hidden h-10 w-10 items-center justify-center rounded-xl text-[#201d1a]/65 transition-all duration-200 hover:bg-[#201d1a]/5 hover:text-[#201d1a] active:scale-95 sm:flex"
            aria-label="Search products"
          >
            <Search size={19} />
          </button>

          <Link
            to="/cart"
            className="group relative flex h-10 items-center gap-2 rounded-xl border border-[#201d1a]/15 bg-white/50 px-4 text-[#201d1a] transition-all duration-200 hover:border-[#201d1a] hover:bg-[#201d1a] hover:text-white active:scale-95"
          >
            <ShoppingBag
              size={18}
              className="transition-transform group-hover:scale-110"
            />

            <span className="hidden text-xs font-bold tracking-wide sm:inline">
              Cart
            </span>

            {cartCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e96b4c] px-1.5 text-[10px] font-black text-[#201d1a] shadow-sm ring-2 ring-[#f7f4ef] transition-transform duration-300 group-hover:scale-110 group-hover:ring-[#201d1a]">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#201d1a] transition-all duration-200 hover:bg-[#201d1a]/5 active:scale-95 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#201d1a]/10 bg-[#f7f4ef] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1.5">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#201d1a] text-white shadow-md"
                    : "text-[#201d1a]/70 hover:bg-[#201d1a]/5"
                }`
              }
            >
              Shop
            </NavLink>

            <button
              type="button"
              onClick={handleCategoriesClick}
              className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[#201d1a]/70 transition-all hover:bg-[#201d1a]/5"
            >
              Categories
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
