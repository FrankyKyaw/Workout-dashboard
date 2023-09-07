"use client"

import React, { useCallback, useState } from 'react'
import MusclePic from '../component/MusclePic'
import { useSearchParams, useRouter } from 'next/navigation'

const Muscle_Options = () => {
  const searchParams = useSearchParams()!;
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const router = useRouter();
  
  const handleMuscleSelectionChanged = (newSelectedMuscle: string[]) => {
    setSelectedMuscles(newSelectedMuscle);
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams()
      searchParams.forEach((value, key) => {
        params.set(key, value);
      });
      params.set(name, value);
 
      return params.toString()
    },
    [searchParams]
  )
  
  const clickHandler = () => {
    const muscleString = selectedMuscles.join(',');
    const newQueryString = createQueryString('muscle_name', muscleString);
    router.push('/filtered_exercises?' + newQueryString);
  }
  return (
    <div className='flex flex-col items-center pt-7'>
        <MusclePic onMuscleSelectionChanged={handleMuscleSelectionChanged}/>
        <div className="mt-10">
        <button className={`w-fit right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 text-black bg-slate-200 dark:bg-[#212933]`}  
        onClick={clickHandler}>Continue</button>
      </div>
    </div>
  )
}

export default Muscle_Options