"use client";
import { useState, useEffect } from "react";
import fetchTodaysProblems from "@/services/fetchTodaysProblems";
import ProblemList from "./problem-list";

interface ProblemProps {
  id: number;
  title: string;
  description: string;
  solutions: string; // This is a JSON string from the database
  source: string;
  created_at: string;
  category: string;
}

const TodaysProblems = () => {
  const [todaysProblems, setTodaysProblems] = useState<ProblemProps[]>([]);

  // Fetch the data from the API

  useEffect(() => {
    // Call the fetch function and set the state with the returned data
    fetchTodaysProblems().then((data) => {
      setTodaysProblems(data);
    });
  }, []);

  return <ProblemList problems={todaysProblems} />;
};
export default TodaysProblems;
