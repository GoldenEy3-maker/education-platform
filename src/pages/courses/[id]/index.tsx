import { useRouter } from "next/router"
import React from "react"
import MainLayout from "~/layouts/Main"
import { type NextPageWithLayout } from "~/pages/_app"

const CoursePage: NextPageWithLayout = () => {
  const router = useRouter()

  return <main>Страница курса - {router.query.id}</main>
}

CoursePage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default CoursePage
