import Link from "next/link";
import { Container } from "../Container";
import SignOutButton from "../button/SignOutButton";

export const Navbar = () => {
  return (
    <div className="w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Link href="/dashboard">Workout</Link>
            <div className="flex flex-row gap-6">
              <Link href="/register"
                className={`w-fit right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 text-black bg-slate-200 dark:bg-[#212933]`}
              >
                Sign In
              </Link>
              <Link href="/register"
                className={`w-fit right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 text-black bg-slate-200 dark:bg-[#212933]`}
              >
                Sign Up
              </Link>
              <SignOutButton/>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
