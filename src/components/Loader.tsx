import { ShoppingBag } from "lucide-react";

function Loader() {
	return (
		<div className="loading-screen" role="status" aria-live="polite">
			<div className="loading-mark">
				<ShoppingBag size={26} strokeWidth={2.5} />
			</div>
			<div className="loading-copy">
				<span className="loading-brand">Tamasha<span>.</span></span>
				<span className="loading-label">Gathering the good stuff</span>
			</div>
			<div className="loading-line" aria-hidden="true">
				<span />
			</div>
		</div>
	);
}

export default Loader;
