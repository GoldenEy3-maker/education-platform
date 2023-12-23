import { Inter } from "next/font/google"
import Head from "next/head"
import { type PropsWithChildren } from "react"
import Footer from "~/components/ui/Footer"
import Header from "~/components/ui/Header"
import Sidebar from "~/components/ui/Sidebar"
import MainModalContainer from "~/modals/Containers/Main"

const inter = Inter({ subsets: ["cyrillic", "latin"] })

type MainLayoutProps = {
  title?: string
  sidebarChildren?: React.ReactNode
} & PropsWithChildren

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (
    <>
      <Head>
        <title>{props.title ?? "Цифровой университет АлтГУ"}</title>
        <meta name="description" content="Цифровой универстите АлтГУ" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className={inter.className}>
        <div className="wrapper">
          <Header />
          <Sidebar />
          {props.children}
        </div>
        <Footer />
        <MainModalContainer />
      </div>
    </>
  )
}

export default MainLayout
