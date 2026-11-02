import Link from "next/link";
import { Nav } from "@/components/site/Nav";

export default function NotFound() {
  return (
    <>
      <Nav page="work" />
      <main className="wrap lost">
        <span className="code" aria-hidden="true">404</span>
        <h1>This page does not exist</h1>
        <p>The address may have a typo, or the page has moved.</p>
        <div className="acts">
          <Link className="btn primary" href="/">Back to home</Link>
          <Link className="btn" href="/work">See all work</Link>
        </div>
      </main>
    </>
  );
}
