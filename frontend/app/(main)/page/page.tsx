import React from 'react';
import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import PortfolioGenerator from '../../components/PortfolioGenerator';
import ExampleSection from '../../components/ExampleSection';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PortfolioGenerator />
        <ExampleSection />
      </main>
      <Footer />
    </div>
  );
}
