import Link from "next/link";

export default function NotFound() {
  return (
    <div className="empty-state">
      <span className="eyebrow">404</span>
      <strong style={{ fontSize: "1.1rem", color: "var(--ink)", fontWeight: 500 }}>
        This page does not exist
      </strong>
      <span className="note">Either the address has a typo, or the entry has been archived.</span>
      <Link href="/work" style={{ color: "var(--ink)", fontSize: "0.9rem", marginTop: 6 }}>
        See all work →
      </Link>
    </div>
  );
}
