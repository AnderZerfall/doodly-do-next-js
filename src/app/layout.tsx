export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
    <html lang="en">
      <head>
        <title>Collaborative Drawing App</title>
      </head>
      <body>
        <header>
          <nav>
          </nav>
        </header>

        <main>
          {children}
        </main>

        <footer>
          <p>&copy; 2025 Collaborative Drawing App</p>
        </footer>
      </body>
    </html>
  );
}