"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

type NavbarUser = {
  isLoggedIn: boolean;
  role: string;
} | null;

type NavbarProps = {
  user?: NavbarUser;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#testimonials", label: "Testimonials" },
];

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="nav-logo" aria-label="BrandME home" onClick={closeMenu}>
          <Image src="/images/logo/brandme-logo.svg" alt="BrandME" width={148} height={40} priority />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions desktop-only">
          {user?.isLoggedIn && user.role === "admin" ? (
            <Link href="/admin" className="btn-secondary">
              Admin
            </Link>
          ) : null}
          <Link href="/contact" className="btn-primary-nav">
            Get Started <ArrowRight size={16} />
          </Link>
        </div>

        <button
          type="button"
          className="mobile-toggle"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen ? <button className="nav-backdrop" aria-label="Close menu" onClick={closeMenu} /> : null}

      <nav className={`mobile-drawer ${isOpen ? "open" : ""}`} aria-label="Mobile navigation">
        <div className="mobile-drawer-content">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link" onClick={closeMenu}>
              {link.label}
            </Link>
          ))}
          {user?.isLoggedIn && user.role === "admin" ? (
            <Link href="/admin" className="btn-secondary mobile-btn" onClick={closeMenu}>
              Admin
            </Link>
          ) : null}
          <Link href="/contact" className="btn-primary-nav mobile-btn" onClick={closeMenu}>
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
