import React from "react"
import MainLayout from "~/layouts/Main"
import { type NextPageWithLayout } from "../_app"

const NotificationsPage: NextPageWithLayout = () => {
  return <main>Страница уведомлений</main>
}

NotificationsPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default NotificationsPage
