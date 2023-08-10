import Link from "next/link"

export default function Home() {
  return (
    <div className="flex h-screen justify-center"> 
      <div className="text-center p-12 pt-48 bg-white max-w-xl"> 
        <h1 className="text-4xl font-bold mb-4">Your Personalized Workout Dashboard</h1> 
        <p className="text-xl text-gray-600">
          Create your own workout plan like never before. It is made easy with this tool.
        </p>
        <div className="pt-8">
        <button className={`w-fit right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 text-black bg-slate-200 dark:bg-[#212933]`}>
          <Link href="/equipment_options"> Get Started</Link>
        </button>
        </div>
        
      </div>
    </div>
  )
}
