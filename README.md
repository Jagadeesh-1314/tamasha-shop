# Tamasha Shop

A React and TypeScript storefront powered by Vite, Redux Toolkit, and the Fake Store API.

## Setup and Run

```bash
npm install
npm start
```

The app runs on the local Vite development server. Use `npm run build` for a production build and `npm run lint` for ESLint checks.

## Caching Strategy

Products are cached in `localStorage` under `products_cache` for five minutes. Valid cached data avoids a network request; expired or invalid data is discarded and refreshed from the API. Product detail lookups reuse the product cache first and request the individual product only when needed. The cart is persisted separately under `tamasha-cart` so it survives reloads.

## Memoization

`useMemo` is used for derived values that would otherwise be recalculated during unrelated renders: filtered and sorted products, product lookup by route id, cart totals, and the header cart count. `useCallback` keeps the product-loading function stable for its effect dependency. `ProductCard` uses `React.memo` because product cards receive stable product props and are rendered in a grid.
