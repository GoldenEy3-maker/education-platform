import React from "react"
import MainLayout from "~/layouts/Main"
import { type NextPageWithLayout } from "../_app"

const ChatPage: NextPageWithLayout = () => {
  return <main>Страница чата</main>
}

ChatPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default ChatPage
