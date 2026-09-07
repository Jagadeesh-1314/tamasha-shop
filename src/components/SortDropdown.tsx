import { ArrowDownUp } from "lucide-react";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({
  value,
  onChange,
}: SortDropdownProps) => {
  return (
    <div className="relative flex items-center">
      <ArrowDownUp
        size={16}
        className="pointer-events-none absolute left-3 text-slate-400"
      />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 appearance-none rounded-xl border border-[#201d1a]/15 bg-white/70 pl-9 pr-8 text-sm font-bold text-[#201d1a]/70 outline-none transition hover:border-[#201d1a]/30 focus:border-[#e96b4c] focus:ring-4 focus:ring-[#e96b4c]/15"
      >
        <option value="default">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="rating">Rating: High to Low</option>
        <option value="name">Name: A to Z</option>
      </select>
    </div>
  );
};

export default SortDropdown;