import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main className="p-8">
        <h1 className="text-4xl font-bold">Welcome to Digly 📚</h1>
        <p className="mt-2">Digital Library for everyone.</p>
      </main>

      <Footer />
    </>
  );
}

export default Home;