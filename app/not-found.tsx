import { Link } from "@/components/link";

export default function NotFound() {
  return (
    <section>
      <h1>Not found</h1>
      <p>That page doesn&apos;t exist. <Link className="link" href="/">Go home</Link>.</p>
    </section>
  );
}
