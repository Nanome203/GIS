
// import Layout from "../components/Layout";
import Footer from "../components/Footer";
import MapView from "../components/MapView";

function MainPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* <Layout /> */}
      <main className="flex-grow">
        <MapView />
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
