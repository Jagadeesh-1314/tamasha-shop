import {
    ArrowUpRight,
    Mail,
} from "lucide-react";
import {
    FaInstagram,
    FaGithub,
    FaTwitter,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="border-t border-[#201d1a]/10 bg-[#201d1a] text-[#f7f4ef]">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                {/* Top */}
                <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
                    {/* Brand */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Tamasha<span className="text-[#e96b4c]">.</span>
                        </h2>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-[#f7f4ef]/55">
                            A little bit of everything, picked with good taste.
                            Discover everyday essentials and things worth keeping.
                        </p>

                        <div className="mt-6 flex gap-2">
                            <SocialButton aria-label="Instagram">
                                <FaInstagram size={17} />
                            </SocialButton>

                            <SocialButton aria-label="Twitter">
                                <FaTwitter size={17} />
                            </SocialButton>

                            <SocialButton aria-label="GitHub">
                                <FaGithub size={17} />
                            </SocialButton>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#f7f4ef]/90">
                            Shop
                        </h3>

                        <ul className="mt-5 space-y-3">
                            <FooterLink href="#products">
                                All Products
                            </FooterLink>

                            <FooterLink href="#categories">
                                Categories
                            </FooterLink>

                            <FooterLink href="#new-arrivals">
                                New Arrivals
                            </FooterLink>

                            <FooterLink href="#deals">
                                Best Deals
                            </FooterLink>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#f7f4ef]/90">
                            Help
                        </h3>

                        <ul className="mt-5 space-y-3">
                            <FooterLink href="#contact">
                                Contact Us
                            </FooterLink>

                            <FooterLink href="#shipping">
                                Shipping & Delivery
                            </FooterLink>

                            <FooterLink href="#returns">
                                Returns & Refunds
                            </FooterLink>

                            <FooterLink href="#faq">
                                FAQ
                            </FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#f7f4ef]/90">
                            Stay in the loop
                        </h3>

                        <p className="mt-4 text-sm leading-6 text-[#f7f4ef]/55">
                            Get occasional updates about new products,
                            special offers, and things we think you'll love.
                        </p>

                        <form className="mt-5 flex overflow-hidden rounded-xl bg-[#f7f4ef] p-1">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#201d1a] outline-none placeholder:text-[#201d1a]/40"
                            />

                            <button
                                type="submit"
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e96b4c] text-[#201d1a] transition hover:bg-[#f4a08b]"
                                aria-label="Subscribe"
                            >
                                <Mail size={17} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-10 h-px bg-[#f7f4ef]/10" />

                {/* Bottom */}
                <div className="flex flex-col gap-4 text-xs text-[#f7f4ef]/40 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} Tamasha Shop. All rights reserved.
                    </p>

                    <div className="flex gap-5">
                        <a
                            href="#privacy"
                            className="transition hover:text-[#f7f4ef]"
                        >
                            Privacy
                        </a>

                        <a
                            href="#terms"
                            className="transition hover:text-[#f7f4ef]"
                        >
                            Terms
                        </a>

                        <a
                            href="#accessibility"
                            className="transition hover:text-[#f7f4ef]"
                        >
                            Accessibility
                        </a>

                        <a
                            href="#"
                            className="flex items-center gap-1 transition hover:text-[#f7f4ef]"
                        >
                            Back to top
                            <ArrowUpRight size={12} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) => {
    return (
        <li>
            <a
                href={href}
                className="group flex w-fit items-center gap-1 text-sm text-[#f7f4ef]/55 transition hover:text-[#f7f4ef]"
            >
                {children}

                <ArrowUpRight
                    size={12}
                    className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
            </a>
        </li>
    );
};

const SocialButton = ({
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f7f4ef]/10 text-[#f7f4ef]/55 transition hover:border-[#e96b4c] hover:bg-[#e96b4c] hover:text-[#201d1a]"
        >
            {children}
        </button>
    );
};

export default Footer;