import { Button } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="container not-found">
      <p className="eyebrow">404 / A small detour</p>
      <h1>
        Let’s get you
        <br />
        back on track.
      </h1>
      <p>We couldn’t find that page. Your next step is still here.</p>
      <Button href="/">Back to Home</Button>
    </section>
  );
}
