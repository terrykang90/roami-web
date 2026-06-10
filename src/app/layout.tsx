// Minimal root layout: <html>/<body> are emitted by the route groups that own
// their chrome — src/app/[locale]/layout.tsx (marketing site) and
// src/app/m/[id]/layout.tsx (public share landing, ROA-192). Each route renders
// exactly one <html>; this root only passes children through.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
