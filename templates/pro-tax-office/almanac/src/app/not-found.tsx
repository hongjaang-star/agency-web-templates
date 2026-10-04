import Link from "next/link";
import { notFoundCopy } from "@/data/site";

export default function NotFound() {
  return (
    <section className="lost">
      <div className="wrap">
        <b>404</b>
        <h1>{notFoundCopy.title}</h1>
        <p>{notFoundCopy.desc}</p>
        <Link className="btn solid" href="/">{notFoundCopy.cta}</Link>
      </div>
    </section>
  );
}
