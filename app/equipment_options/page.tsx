"use client";

import EquipmentCard from "../component/EquipmentCard";
import { useCallback, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";


const Equipment_Options = () => {
  const equipments = [
    { name: "Dumbbells", image: "/Dumbbell.png" },
    { name: "Band", image: "/Band.png" },
    { name: "Yoga Mat", image: "/yoga_mat.png" },
    { name: "No Equipments", image: "/No_equipment.png" },
  ];
  const searchParams = useSearchParams()!;
  const pathName = usePathname();
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);
  const router = useRouter();

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

  const handleClick = () => {
    const equipmentString = selectedEquipments.join(',');

    // Create a new query string by merging the current searchParams with the selected equipment
    const newQueryString = createQueryString('equipment', equipmentString);

    // Navigate to the '/muscle_options' page with the new query string
    router.push('/muscle_options?' + newQueryString);
  };

  const toggleSelection = (name: string) => {
    if (selectedEquipments.includes(name)) {
      setSelectedEquipments(
        selectedEquipments.filter((equipment) => equipment !== name)
      );
    } else {
      setSelectedEquipments([...selectedEquipments, name]);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center pt-6">
      <div className="mb-2 text-center">
        <h1 className="text-4xl">Equipment</h1>
        <h3 className="pt-6">Choose the equipments that you have.</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 w-1/3 h-80">
        {equipments.slice(0, 4).map((equipment, index) => (
          <div
            key={index}
            className={`relative flex items-center justify-center ${
              selectedEquipments.includes(equipment.name)
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
            onClick={() => toggleSelection(equipment.name)}
          >
            <EquipmentCard name={equipment.name} image={equipment.image} />
          </div>
        ))}
      </div>
      <div className="mt-10">
        <button
          className={`w-fit right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 text-black bg-slate-200 dark:bg-[#212933]`}
          onClick={handleClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Equipment_Options;
