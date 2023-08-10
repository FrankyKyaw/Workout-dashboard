import React from "react";
import EquipmentCard from "../component/EquipmentCard";

const Equipment_Options = () => {
  const equipments = [
    { name: "Dumbbell", image: "/Dumbbell.png" },
    { name: "Band", image: "/Band.png" },
    { name: "Yoga mat", image: "/yoga_mat.png" },
    { name: "KettleBell", image: "/Kettlebell.png" },
  ];

  return (
    <div className="flex flex-col items-center justify-center pt-6">
      <div className="mb-2 text-center">
        <h1 className="text-4xl">Equipment</h1>
        <h3 className="pt-6">Choose the equipments that you have.</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 w-1/3 h-80">
        {equipments.slice(0, 4).map((equipment, index) => (
          <div key={index} className="flex items-center hover:bg-gray-200 justify-center">
            <EquipmentCard name={equipment.name} image={equipment.image}/>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <button className={`w-fit right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 text-black bg-slate-200 dark:bg-[#212933]`}  >Continue</button>
      </div>
    </div>
  );
};

export default Equipment_Options;
