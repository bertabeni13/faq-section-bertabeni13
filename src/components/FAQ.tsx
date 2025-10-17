import { useState } from "react";

type FAQ = { q: string; a: string };
type Props = { items: FAQ[] };

export default function FAQ({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="card">
      <h1>FAQs</h1>

      {items.map((x, i) => (
        <div key={i} className="item">
          <button
            className={`question ${open === i ? "is-open" : ""}`}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="q">{x.q}</span>
            <span className={`icon ${open === i ? "minus" : "plus"}`} aria-hidden />
          </button>

          {open === i && <p className="answer">{x.a}</p>}
        </div>
      ))}
    </div>
  );
}
