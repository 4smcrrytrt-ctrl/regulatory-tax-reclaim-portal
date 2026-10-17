import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function RequestsPage() {
  const items = await db.taxReclaimRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return (
    <main style={{ padding: 24 }}>
      <h2>Suivi des demandes</h2>
      <table cellPadding={8}>
        <thead>
          <tr><th>ID</th><th>Demandeur</th><th>Pays</th><th>Montant</th><th>Statut</th></tr>
        </thead>
        <tbody>
          {items.map((x) => (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{x.firstName} {x.lastName}</td>
              <td>{x.country}</td>
              <td>{x.amountEur.toString()} €</td>
              <td>{x.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
