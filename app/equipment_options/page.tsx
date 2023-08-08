import React from "react";

const Equipment_Options = () => {
  const equipments = [
    { name: "Dumbbell", image: "/Dumbbell.png" },
    { name: "Band", image: "/Band.png" },
    { name: "Yoga mat", image: "/yoga_mat.png" },
    { name: "KettleBell", image: "/Kettlebell.png" },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-24">
      <div className="mb-10 text-center">
        <h1 className="text-4xl">Equipment</h1>
        <h3 className="pt-8">Choose the equipments that you have.</h3>
      </div>
      <div className="w-1/3 h-96 border-2 border-black">
        {equipments.map((equipment, index) => (
          <div key={index} className="flex items-center justify-between p-2">
            <img
              src={equipment.image}
              alt={equipment.name}
              className="w-10 h-10"
            />
            <p>{equipment.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipment_Options;
