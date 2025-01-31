import "./global.css";

export const metadata = {
  title: "katayev.io",
  description:
    "Experienced Web Developer and Computer Science graduate with expertise in JavaScript, Python, React, and more.",
  robots: "noindex, nofollow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-zinc-800">{children}</body>
    </html>
  );
}
