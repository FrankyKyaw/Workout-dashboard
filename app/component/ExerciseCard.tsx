import React from "react";

interface ExerciseCardProps {
  index: number;
  exercise_name: string;
  video_link: string;
  toggleAddOrRemove: (index: number, action: string) => void;
  is_added: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  index,
  exercise_name,
  video_link,
  toggleAddOrRemove,
  is_added
}) => {
  return (
    <div className="flex mb-4 justify-between items-center w-full " key={index}>
      <h3 className="w-2/3">{exercise_name}</h3>
      <a
        className="hover:scale-105 hover:bg-slate-200 w-fit bg-slate-100 p-2 rounded-md"
        target="_blank"
        rel="noopener noreferrer"
        href={video_link}
      >
        Watch video
      </a>
      <button className="hover:scale-105 w-fit bg-slate-100 p-2 rounded-md hover:bg-slate-200"
      onClick={() => toggleAddOrRemove(index, is_added ? 'remove' : 'add')}>
        {is_added ? "Remove" : "Add"}
      </button>
    </div>
  );
};
