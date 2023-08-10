"use client"

interface EquipmentCardProps {
    name: string;
    image: string;
}

const EquipmentCard:React.FC<EquipmentCardProps> = ({name, image}) => {
  return (
    <div className="flex flex-col items-center w-full h-full max-w-[100px] max-h-[100px]">
        <img className="w-full h-auto " src={image} alt={name}></img>
        <h3 className="w-full text-center">{name}</h3>
    </div>
  )
}

export default EquipmentCard