import "./global.css";

export const metadata = {
  title: "Josh Katayev",
  description: "My Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-zinc-800">{children}</body>
    </html>
  );
}
