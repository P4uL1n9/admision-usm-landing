import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuickAccessCards from "@/components/QuickAccessCards";
import CareerComparator from "@/components/CareerComparator";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <QuickAccessCards />
        <CareerComparator />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
