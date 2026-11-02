import Link from "next/link";
import { profile } from "@/content/site";

/** Bar atas yang menempel. `page` menandai link yang sedang aktif. */
export function Nav({ page = "home" }: { page?: "home" | "work" }) {
  const home = page === "home" ? "" : "/";
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" href="/">
          <span className="logo" aria-hidden="true">ZI</span>
          <span className="name">{profile.name}</span>
        </Link>
        <nav className="links" aria-label="Sections">
          <a href={`${home}#capabilities`}>Capabilities</a>
          <a href={`${home}#lead`}>Leadership</a>
          <Link href="/work" aria-current={page === "work" ? "page" : undefined}>Work</Link>
          <a href={`${home}#experience`}>Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="btn sm" href="#contact">Book a call</a>
      </div>
    </header>
  );
}
