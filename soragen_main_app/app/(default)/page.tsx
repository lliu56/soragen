// metadata
export const metadata = {
  title: "Home - ADiGen",
  description: "Page description",
};

// template components
import Hero from "@/components/ui/hero";
import Features from "@/components/content/features";
import FeaturesBlocks from "@/components/content/features-blocks";
import Testimonials from "@/components/content/testimonials";
import Newsletter from "@/components/content/newsletter";
// import ExpandableWidget from "@/components/problem-item";

// custom components
import FetchTodaysProblems from "@/services/fetchTodaysProblems";
import TodaysProblems from "@/components/content/todays-problems";
import ProblemListSection from "@/components/utils/inspire-button";
import InspireButton from "@/components/utils/inspire-button";
import { ToastContainer } from "react-toastify";

// markup

export default function Home() {
  return (
    <>
      <ToastContainer />
      <Hero />
      <InspireButton />
      {/* <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter /> */}
    </>
  );
}
