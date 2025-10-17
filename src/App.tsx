import { useEffect, useState } from "react";
import "./components/App.css";
import FAQ from "./components/FAQ";

type FAQItem = { q: string; a: string };

export default function App() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then((data) => {
        
        const arr = Array.isArray(data) ? data : (data.faqs ?? []);
        const normalized: FAQItem[] = arr.map((it: any) => ({
          q: it.q ?? it.question ?? "",
          a: it.a ?? it.answer ?? ""
        }));
        setFaqs(normalized);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Betöltés…</p>;
  if (!faqs.length) return <p>Nincs megjeleníthető kérdés.</p>;

  return (
    <div className="app">
      <FAQ items={faqs} />
    </div>
  );
}
