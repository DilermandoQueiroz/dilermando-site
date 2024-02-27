import Image from "next/image";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Avatar from "@/components/Avatar";
import Name from "@/components/Name";
import Skills from "@/components/Skills";
import About from "@/components/About";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navigation/>
      <Avatar/>
      <Name/>
      <Skills/>
      <About/>
    </>
  )
}
