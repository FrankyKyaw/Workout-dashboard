import { Container } from "../Container";

export const Navbar = () => {
  return (
    <div className="w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <div>This is a Logo.</div>
            <div className="flex flex-row gap-6">
              <div>Sign In</div>
              <div>Sign Up</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
