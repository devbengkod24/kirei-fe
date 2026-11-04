export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-semibold">Kelola Reservasi</h2>
      {children}
    </div>
  );
}
