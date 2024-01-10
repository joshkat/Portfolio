import "./components/css/index.css";
import "./global.css";

export const metadata = {
  title: 'Josh Katayev',
  description: 'My Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
