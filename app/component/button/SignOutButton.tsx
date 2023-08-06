"use client";
import { redirect } from "next/navigation";
import supabase from "../../supabase";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out", error);
    } else {
    }
    router.push("/");
  };
  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
