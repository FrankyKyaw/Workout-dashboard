import React, { useState } from 'react'
import MusclePic from '../component/MusclePic'
import { useSearchParams, useRouter } from 'next/navigation'

const Muscle_Options = () => {
  const searchParams = useSearchParams()!;
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const router = useRouter;

  return (
    <div>
        <MusclePic onMuscleSelectionChanged={handleMuscleSelectionChanged}/>
        <div className="mt-10">
        <button className={`w-fit right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 text-black bg-slate-200 dark:bg-[#212933]`}  >Continue</button>
      </div>
    </div>
  )
}

export default Muscle_Options