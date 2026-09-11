import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans text-white bg-black dark:bg-black">
      <section className="flex flex-col items-center justify-center w-full h-screen text-center">
        <Image
          src={"/images/landing/bg-landing.png"}
          alt="Landing Background"
          width={1972}
          height={1315}
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <div className="flex items-center justify-center gap-3 text-7xl font-bold z-10">
          <h1 className="shadow-black">Discover.</h1>
          <h1 className="">Create.</h1>
          <h1 className="">Celebrate.</h1>
        </div>
        <div className="max-w-screen h-fit px-40 mt-10 flex items-center justify-center text-xl font-semibold z-10">
          <p>
            This campus is full of exciting events, amazing clubs, and
            unforgettable experiences. Find what`&apos;`s happening, join your favorite
            communities, and create events that bring everyone together.
          </p>
        </div>
        <div className="max-w-screen h-fit px-40 mt-10 flex items-center justify-center text-xl font-semibold z-10">
          <button className="border-4 rounded-full p-5">Explore Events</button>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full h-screen text-center">
        <h2>What we Do</h2>
      </section>
    </div>
  );
}
