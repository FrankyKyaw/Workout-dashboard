"use client";
import supabase from "../supabase";
import { GetServerSideProps } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";

interface Exercise {
  index: number;
  exercise_name: string;
  video_link: string;
  equipment: string;
  difficulty: string;
  muscle_name: string;
}

type FilteredExercisesProps = {
  exercises: Exercise[];
};

export default function FilteredExercises() {
  const router = useRouter();
  const searchParams = useSearchParams()!;

  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<Error | PostgrestError | null>(null);

  const validEquipments = ["Dumbbells", "Stretches"];
  const validMuscles = ["Biceps", "Long Head Bicep"];

  let muscles: string[] = [];
  let equipments: string[] = [];

  useEffect(() => {
    const fetchData = async () => {
      searchParams.forEach((value, key) => {
        if (key === "muscle_name") {
          muscles = [...muscles, ...value.split(",")];
        } else {
          const newEquipments = value.split(",");
          if (newEquipments.includes("No Equipments")) {
            console.log("No Equipments is here");
            newEquipments.push("Stretches", "Body Weight");
          }
          equipments = [...equipments, ...newEquipments];
        }
      });
      console.log(muscles);
      console.log(equipments);

      const { data, error } = await supabase
        .from("Exercises")
        .select("*")
        .in("muscle_name", muscles)
        .in("equipment", equipments)

      if (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } else {
        console.log("Received data:", data);
        setData(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* <pre>
        {JSON.stringify(data, null, 2)}
      </pre> */}
      <div>
        {data
          ? data.map((exercise, index) => (
              <div key={index}>
                {exercise.exercise_name}
                {exercise.muscle_name}
                {exercise.equipment}
              </div>
            ))
          : "No exercises found."}
      </div>
    </div>
  );
}
