import React from 'react'

interface ExerciseCardProps {
    index: number;
    exercise_name: string;
    video_link: string
}

export const ExerciseCard: React.FC<ExerciseCardProps>= ({index, exercise_name, video_link}) => {
  return (
    <div className="flex mb-4 justify-between items-center w-full " key={index}>
        <h3 className='w-2/3'>{exercise_name}</h3>
        <a className="" href={video_link}>Click here</a>
    </div>
  )
}
