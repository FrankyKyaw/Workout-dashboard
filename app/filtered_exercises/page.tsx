"use client";
import supabase from "../supabase";
import { GetServerSideProps } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { ExerciseCard } from "../component/ExerciseCard";
import Image from "next/image";

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
  const searchParams = useSearchParams()!;

  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<Error | PostgrestError | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [addedExercises, setAddedExercises] = useState<Set<number>>(new Set());

  
  

  const [showCheckList, setShowCheckList] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  const [checkedExercises, setCheckedExercises] = useState<Set<number>>(new Set());

  const toggleAddOrRemove = (index: number, action: string) => {
    const newAddedExercises = new Set(addedExercises);
    if (action == "add") {
      newAddedExercises.add(index);
    } else {
      newAddedExercises.delete(index);
    }
    setAddedExercises(newAddedExercises);
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newCheckedExercises = new Set(checkedExercises);
    if (checked) {
      newCheckedExercises.add(index);
    } else {
      newCheckedExercises.delete(index);
    }
    setCheckedExercises(newCheckedExercises);
  
    // Check if all added exercises are checked
    if (Array.from(addedExercises).every((exercise) => newCheckedExercises.has(exercise))) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  };

  const handleStart = () => {
    setShowCheckList(true);
    console.log(addedExercises);
  };

  const renderCheckList = () => {
    return (
      <div className="flex flex-col p-6 bg-white border max-h-[500px] overflow-y-auto border-gray-200 rounded-lg shadow ">
        <h2 className="mb-6">Workout Checklist:</h2>
        {data
          ? data.map(
              (exercise) =>
                addedExercises.has(exercise.index) && (
                  <div className="flex mb-3 bg-white p-1 justify-between items-center mr-2" key={exercise.index}>
                    <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`exercise-${exercise.index}`}
                      name={`exercise-${exercise.index}`}
                      onChange={(e) => handleCheckboxChange(exercise.index, e.target.checked)}
                    />
                    <label className="p-2" htmlFor={`exercise-${exercise.index}`}>
                      {exercise.exercise_name}
                    </label>
                    </div>
                    
                    <a href={exercise.video_link} target="_blank" rel="noopener noreferrer"> (Watch Video)</a>
                  </div>
                )
            )
          : "No exercises found."}
      </div>
    );
  };

  useEffect(() => {
    let muscles: string[] = [];
    let equipments: string[] = [];
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
        .from("Workout Exercises")
        .select("*")
        .in("muscle_name", muscles)
        .in("equipment", equipments);

      if (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } else {
        console.log("Received data:", data);
        setData(data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="mt-4 flex flex-col items-center">
      {!showCheckList ? (
        <div className="flex flex-col items-center w-2/3">
        <div className="flex flex-col w-2/3 p-6 bg-white border max-h-[500px] overflow-y-auto border-gray-200 rounded-lg shadow ">
          {isLoading ? (
            "Loading exercises..."
          ) : data
            ? data.map((exercise) => (
                <ExerciseCard
                  key={exercise.index}
                  index={exercise.index}
                  exercise_name={exercise.exercise_name}
                  video_link={exercise.video_link}
                  toggleAddOrRemove={toggleAddOrRemove}
                  is_added={addedExercises.has(exercise.index)}
                />
              ))
            : "No exercises found."}
            
        </div>
        <button
        className={`mt-6 w-fit right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 text-black bg-slate-200 dark:bg-[#212933]`}
        onClick={handleStart}
      >
        Start Workout
      </button>
      </div>
      ) : allChecked ? (
      <div className="flex flex-col p-3 w-full h-full items-center rounded-lg ">
          <h2 className="text-2xl font-bold">Workout completed! 🎉</h2>
          <p className="mt-3 italic">The pain you feel today is the strength you feel tomorrow.</p>
          <Image className="mt-4 mb-8" src="/congrats.svg" alt="Description" width={800} height={400}/>
      </div>
      ) : (
        renderCheckList()
      )}

    </div>
  );
}
