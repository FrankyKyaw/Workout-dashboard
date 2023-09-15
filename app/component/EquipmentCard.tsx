"use client"

import Image from "next/image";

interface EquipmentCardProps {
    name: string;
    image: string;
}

const EquipmentCard:React.FC<EquipmentCardProps> = ({name, image}) => {
  return (
    <div className=" absolute inset-y-1 flex flex-col items-center w-full h-full max-w-[100px] max-h-[100px]">
      <Image src={image} alt="Description" width={500} height={300}/>
        <h3 className="w-full text-center">{name}</h3>
    </div>
  )
}

export default EquipmentCard