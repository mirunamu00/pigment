import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/chrome";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="page" style={{ padding: "120px var(--gutter) 40px", textAlign: "center" }}>
        <p className="eyebrow">404</p>
        <h1 style={{ margin: 0, fontSize: 40, fontWeight: 600, letterSpacing: "-0.035em" }}>
          Page not found.
        </h1>
        <p className="muted" style={{ marginTop: 14 }}>
          The system or page you were looking for does not exist.
        </p>
        <p style={{ marginTop: 24 }}>
          <Link href="/" className="btn btn--primary">
            Back to systems
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
