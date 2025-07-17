// src/features/book/bookPages/HomeBooks.tsx

import HeroSection from "@/components/HeroSection";
import Books from "./Books";

const HomeBooks = () => {
  return (
    <div>
      <HeroSection />
      <Books limit={10} />
    </div>
  );
};

export default HomeBooks;
