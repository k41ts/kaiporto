import Link from "next/link";

export default function NotFound() {
  return (
    <main className="lost">
      <span className="kj" aria-hidden="true">鬼</span>
      <h1>Target lost</h1>
      <p>This page does not exist. The address may have a typo, or the page has moved.</p>
      <div className="acts">
        <Link className="pill black" href="/">Back to home</Link>
        <Link className="pill" href="/work">See all work</Link>
      </div>
    </main>
  );
}
