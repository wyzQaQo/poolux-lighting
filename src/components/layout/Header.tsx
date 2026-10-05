"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Send,
  Phone,
  Waves,
  Droplets,
  Anchor,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const productCategories = [
  {
    title: "In-Ground Pool Lights",
    href: "/products/in-ground-pool-lights",
    description: "Flush-mount LED for infinity & resort pools",
    icon: Waves,
  },
  {
    title: "Fountain & Water Feature Lights",
    href: "/products/fountain-water-feature-lights",
    description: "Center-hole & adjustable bracket designs",
    icon: Droplets,
  },
  {
    title: "Marine & Saltwater-Grade",
    href: "/products/marine-saltwater-lights",
    description: "SS316L for coastal & marina environments",
    icon: Anchor,
  },
];

const mainNav = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products", hasDropdown: true },
  { title: "Blog", href: "/blog" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#0A1628]/90 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#0EA5E9] to-[#38BDF8] shadow-lg shadow-[#0EA5E9]/25">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Pool<span className="text-[#0EA5E9]">ux</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {mainNav.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuTrigger
                        className={cn(
                          "bg-transparent text-sm text-white/70 hover:bg-white/5 hover:text-white data-[state=open]:bg-white/5 data-[state=open]:text-white",
                          pathname.startsWith("/products") &&
                            "text-[#0EA5E9]"
                        )}
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[420px] p-3">
                          <div className="grid gap-1">
                            {productCategories.map((cat) => (
                              <Link
                                key={cat.href}
                                href={cat.href}
                                legacyBehavior
                                passHref
                              >
                                <NavigationMenuLink
                                  className={cn(
                                    "flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-white/5",
                                    pathname === cat.href && "bg-white/5"
                                  )}
                                >
                                  <cat.icon className="mt-0.5 h-5 w-5 text-[#0EA5E9]" />
                                  <div>
                                    <div className="text-sm font-medium text-white">
                                      {cat.title}
                                    </div>
                                    <p className="text-xs text-white/50">
                                      {cat.description}
                                    </p>
                                  </div>
                                </NavigationMenuLink>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-2 border-t border-white/10 pt-2">
                            <Link
                              href="/products"
                              className="block rounded-lg p-3 text-sm font-medium text-[#0EA5E9] transition-colors hover:bg-white/5"
                            >
                              View All Products →
                            </Link>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }
                return (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          "inline-flex h-9 items-center rounded-md px-3 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white",
                          pathname === item.href && "text-[#0EA5E9]"
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white"
          >
            <Link href="tel:+8613812345678">
              <Phone className="mr-1.5 h-4 w-4" />
              +86 138 1234 5678
            </Link>
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white hover:from-[#0EA5E9]/90"
          >
            <Link href="/contact">
              <Send className="mr-1.5 h-4 w-4" />
              Get Pool Light Quote
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-white/10 bg-[#0A1628] text-white"
          >
            <div className="mt-8 flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-base transition-colors hover:bg-white/5",
                  pathname === "/" && "text-[#0EA5E9]"
                )}
              >
                Home
              </Link>
              <div className="py-1">
                <span className="px-3 text-xs font-semibold uppercase tracking-wider text-[#0EA5E9]">
                  Products
                </span>
                {productCategories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <cat.icon className="h-4 w-4" />
                    {cat.title}
                  </Link>
                ))}
                <Link
                  href="/products"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-[#0EA5E9] transition-colors hover:bg-white/5"
                >
                  View All Products →
                </Link>
              </div>
              {["Blog", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-base transition-colors hover:bg-white/5",
                    pathname === `/${item.toLowerCase()}` && "text-[#0EA5E9]"
                  )}
                >
                  {item}
                </Link>
              ))}
              <div className="mt-4 border-t border-white/10 pt-4">
                <Button
                  className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]"
                  onClick={() => setMobileOpen(false)}
                >
                  <Link href="/contact">
                    <Send className="mr-2 h-4 w-4" />
                    Get Pool Light Quote
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
