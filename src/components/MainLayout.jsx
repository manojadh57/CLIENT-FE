import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "16px" }}>
        {children}
      </main>
    </>
  );
}
