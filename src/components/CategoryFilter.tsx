interface Product {
  category: string;
}

interface CategoryFilterProps {
  products: Product[];
  selected: string;
  onChange: (category: string) => void;
}

const CategoryFilter = ({
  products,
  selected,
  onChange,
}: CategoryFilterProps) => {
  const categories = [
    "All",
    ...Array.from(
      new Set(products.map((product) => product.category))
    ),
  ];

  return (
    <div
      id="categories"
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
    >
      {categories.map((category) => {
        const active = selected === category;

        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
              active
                ? "bg-[#201d1a] text-white shadow-sm"
                : "bg-white/70 text-[#201d1a]/65 ring-1 ring-inset ring-[#201d1a]/15 hover:bg-white hover:text-[#201d1a]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
