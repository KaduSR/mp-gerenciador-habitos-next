export const metadata = {
  title: "🌿 Hábitus",
  description: "Seu gerenciador de hábitos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-4">
        <header className="text-2xl font-bold mb-4">
          <span className="text-white">🌿</span>{" "}
          <span className="text-green-500">Hábitus</span>
        </header>
        {children}
      </body>
    </html>
  );
}
