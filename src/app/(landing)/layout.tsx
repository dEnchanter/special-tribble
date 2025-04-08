import { Navbar } from "@/components/utils/navbar"
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout