import Link from "next/link";
export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Regulatory Reporting &amp; Tax Reclaim Portal</h1>
      <ul>
        <li><Link href="/requests/new">Nouvelle demande</Link></li>
        <li><Link href="/requests">Suivi des demandes</Link></li>
      </ul>
    </main>
  );
}
