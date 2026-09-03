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
                className="w-full h-full object-cover  top-0 left-0"
            />
       </section>
       <section className="flex flex-col items-center justify-center w-full h-screen text-center">
           <h2>What we Do</h2>
       </section>
    </div>
  );
}

