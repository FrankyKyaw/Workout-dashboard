"use client";
import supabase from "../supabase";
import { GetServerSideProps } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { ExerciseCard } from "../component/ExerciseCard";

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
    <div className="mt-4 flex flex-col items-center">
      {/* <pre>
         {JSON.stringify(data, null, 2)}
      </pre> */}
      <div className="flex flex-col max-w-lg w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow ">
        {data
          ? data.map((exercise, index) => (
            <ExerciseCard
            index={index}
            exercise_name={exercise.exercise_name}
            video_link={exercise.video_link}
            />
            ))
          : "No exercises found."}
      </div>
      <button className={`mt-6 w-fit right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 text-black bg-slate-200 dark:bg-[#212933]`}  
        >Start Workout</button>
    </div>
  );
}
