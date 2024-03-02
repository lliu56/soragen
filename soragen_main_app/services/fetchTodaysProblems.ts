"use client"
import { useState, useEffect } from "react";
import supabase from "@/utils/supabaseClient";

interface ProblemProps {
  id: number;
  title: string;
  description: string;
  solutions: string; // This is a JSON string from the database
  source: string;
  created_at: string;
  category: string;
}

async function fetchTodaysProblems():Promise<ProblemProps[]> 
 {
  const today = new Date().toISOString().split("T")[0];

  try {
    const { data, error, status } = await supabase
      .from("analyzed_content")
      .select("*")
      .gte("created_at", `${today}T00:00:00+00:00`)
      .lte("created_at", `${today}T23:59:59+00:00`);
    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      console.log("Today's content retrieved:", data);
      return data;
    }
  } catch (err) {
    console.error("Error:", err, ", Today's content not retrieved");
  }

  return [];
}

export default fetchTodaysProblems