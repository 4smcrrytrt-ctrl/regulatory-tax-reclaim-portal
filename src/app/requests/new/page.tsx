"use client";
import { useState } from "react";

export default function NewRequestPage() {
  const [msg, setMsg] = useState("");

  async function submit(fd: FormData) {
    const payload = {
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      email: fd.get("email"),
      country: fd.get("country"),
      taxNumber: fd.get("taxNumber"),
      amountEur: fd.get("amountEur"),
      reason: fd.get("reason"),
      documentName: (fd.get("document") as File)?.name || undefined
    };
    const r = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setMsg(r.ok ? "Demande envoyée ✅" : "Erreur d’envoi ❌");
  }

  return (
    <main style={{ padding: 24 }}>
      <h2>Nouvelle demande</h2>
      <form action={submit} style={{ display: "grid", gap: 10, maxWidth: 520 }}>
        <input name="firstName" placeholder="Prénom" required />
        <input name="lastName" placeholder="Nom" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="country" placeholder="Pays" required />
        <input name="taxNumber" placeholder="Numéro fiscal" required />
        <input name="amountEur" type="number" step="0.01" placeholder="Montant EUR" required />
        <textarea name="reason" placeholder="Motif (min. 10 caractères)" required />
        <input name="document" type="file" />
        <button type="submit">Soumettre</button>
      </form>
      <p>{msg}</p>
    </main>
  );
}
