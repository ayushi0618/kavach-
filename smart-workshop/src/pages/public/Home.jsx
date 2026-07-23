import PageTransition from '../../components/animations/PageTransition';
import PublicNavbar from '../../components/layout/PublicNavbar';
import Footer from '../../components/layout/Footer';
import HeroSection from '../../components/sections/HeroSection';
import AboutSection from '../../components/sections/AboutSection';
import DepartmentsSection from '../../components/sections/DepartmentsSection';
import WorkflowSection from '../../components/sections/WorkflowSection';
import FeaturesSection from '../../components/sections/FeaturesSection';
import StatsSection from '../../components/sections/StatsSection';
import GallerySection from '../../components/sections/GallerySection';
import CTASection from '../../components/sections/CTASection';

export default function Home() {
  return (
    <PageTransition>
      <div className="w-full bg-white font-sans overflow-x-hidden selection:bg-primary selection:text-white">
        <PublicNavbar />
        
        <main>
          <HeroSection />
          <AboutSection />
          <DepartmentsSection />
          <WorkflowSection />
          <FeaturesSection />
          <StatsSection />
          <GallerySection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
