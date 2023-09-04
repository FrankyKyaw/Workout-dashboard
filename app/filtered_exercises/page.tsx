"use client"
import supabase from "../supabase";
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";

interface Exercise {
    index: number,
    exercise_name: string,
    video_link: string,
    equipment: string,
    difficulty: string,
    muscle_name: string
}

type FilteredExercisesProps = {
    exercises: Exercise[];
  };

// export const getServerSideProps: GetServerSideProps<FilteredExercisesProps> = async (context) => {
//   // Retrieve selected equipment and muscles from context (e.g., query params, cookies, etc.)
//   const validEquipments = ["Dumbbells", "Stretches"]; // Replace with actual valid values
//   const validMuscles = ["Biceps", "Long Head Bicep"]; // Replace with actual valid values

//   const selectedEquipment = Array.isArray(context.query.equipment) ? context.query.equipment : [context.query.equipment];
//   const selectedMuscles = Array.isArray(context.query.muscles) ? context.query.muscles : [context.query.muscles];
//   // Query Supabase to filter exercises based on selected equipment and muscles

//   console.log("Working till now")
//   const { data: exercises, error } = await supabase
//     .from('Exercises')
//     .select('index')
//     // .eq('exercise_name', 'Dumbbell Curl')
//     // .in('equipment', validEquipments)
//     // .in('muscle_name', validMuscles);

//   console.log("Exercises are", JSON.stringify(exercises, null, 2));
//     if (error || !exercises) {
//       console.error("Error fetching exercises: ", error);
//       return {
//         notFound: true,
//       };
//     }
//   return {
//     props: { exercises: exercises || [] }, 
//   };
// };

export default function FilteredExercises() {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<Error | PostgrestError | null>(null);
  const validEquipments = ["Dumbbells", "Stretches"]; 
  const validMuscles = ["Biceps", "Long Head Bicep"]; 
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('Exercises').select("*").in('equipment', validEquipments).in('muscle_name', validMuscles)
      
      console.log(data);
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
        {data ? data.map((exercise, index) => (
          <div key={index}>{exercise.exercise_name}{exercise.muscle_name}{exercise.equipment}</div>
        )) : "No exercises found."}
      </div>
    </div>
  );
}

































// // FilteredExercises.tsx
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import supabase from "../supabase";

// interface Exercise {
//   index: number,
//   exercise_name: string,
//   video_link: string,
//   equipment: string,
//   difficulty: string,
//   muscle_name: string
// }

// type FilteredExercisesProps = {
//   exercises: Exercise[];
// };

// const FilteredExercises: React.FC<FilteredExercisesProps> = () => {
//   const router = useRouter();
//   const [exercises, setExercises] = useState<Exercise[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const selectedEquipment = router.query.equipment;
//       const selectedMuscles = router.query.muscles;

//       const { data, error } = await supabase
//         .from<Exercise>('Exercises')
//         .select('*')
//         // Uncomment and modify these lines as needed
//         // .in('equipment', Array.isArray(selectedEquipment) ? selectedEquipment : [selectedEquipment])
//         // .in('muscle_name', Array.isArray(selectedMuscles) ? selectedMuscles : [selectedMuscles]);

//       if (error || !data) {
//         console.error("Error fetching exercises: ", error);
//       } else {
//         setExercises(data);
//       }
//     };

//     fetchData();
//   }, [router.query]);

//   return (
//     <div>
//       {exercises.map((exercise) => (
//         <div key={exercise.index}>{exercise.exercise_name}</div>
//       ))}
//     </div>
//   );
// };

// export default FilteredExercises;
