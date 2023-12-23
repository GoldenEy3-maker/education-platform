import MainLayout from "~/layouts/Main"
import { type NextPageWithLayout } from "../_app"

const CoursesPage: NextPageWithLayout = () => {
  return <main>Страница курсов</main>
}

CoursesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default CoursesPage
