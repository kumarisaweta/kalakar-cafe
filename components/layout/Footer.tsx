import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-primary/10 bg-white/60 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-t from-bg-alt/50 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-2xl font-bold text-text-primary">
              Cafe <span className="text-primary">Kalakar</span>
            </h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              Where art meets coffee. A premium artistic Indian cafe crafting
              warm experiences in every cup.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-secondary">
              Visit Us
            </h4>
            <address className="mt-4 not-italic text-sm leading-relaxed text-text-secondary">
              42 Art District Lane
              <br />
              Bandra West, Mumbai 400050
              <br />
              Open daily · 7am – 11pm
            </address>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-secondary">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li><Link href="/menu" className="link-underline hover:text-primary">Menu</Link></li>
              <li><Link href="/order" className="link-underline hover:text-primary">Order Online</Link></li>
              <li><Link href="/reservation" className="link-underline hover:text-primary">Reservations</Link></li>
              <li><Link href="/about" className="link-underline hover:text-primary">Our Story</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-primary/10 pt-8 text-center text-xs text-text-secondary/60">
          © {new Date().getFullYear()} Cafe Kalakar. Crafted with warmth.
        </div>
      </div>
    </footer>
  );
}
