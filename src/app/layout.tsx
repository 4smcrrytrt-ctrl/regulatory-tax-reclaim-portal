export const metadata = { title: "Tax Reclaim Portal" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
