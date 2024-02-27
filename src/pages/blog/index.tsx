import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Title from "@/components/Title";
import Publication from "@/components/Publication";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navigation/>
      <Title/>
      <Publication/>
    </>
  )
}
