import CoursesFeed from "~/components/#pages/home/CoursesFeed"
import NewsFeed from "~/components/#pages/home/NewsFeed"
import Welcome from "~/components/#pages/home/Welcome"
import Calendar from "~/components/ui/Calendar"
import {
  IconCalendar,
  IconFolder,
  IconNews,
  IconRightArrowAlt,
} from "~/components/ui/Icons"
import Link from "~/components/ui/Link"
import Section from "~/components/ui/Section"
import MainLayout from "~/layouts/Main"
import { PagePathMap } from "~/utils/enums"
import { cls } from "~/utils/func"
import { type NextPageWithLayout } from "./_app"
import styles from "./styles.module.sass"

const HomePage: NextPageWithLayout = () => {
  return (
    <main className={cls(styles.main, "content-grid")}>
      <Welcome />
      <Section.Group>
        <Section isSpanGridArea>
          <Section.Header>
            <Section.Title>
              <IconFolder /> Курсы
            </Section.Title>
            <Link href={PagePathMap.CoursesPage} variant="elevated" size="sm">
              Посмотреть все <IconRightArrowAlt />
            </Link>
          </Section.Header>
          <Section.Content>
            <CoursesFeed />
          </Section.Content>
        </Section>
        <Section isSpanGridArea>
          <Section.Header>
            <Section.Title>
              <IconNews /> Новости
            </Section.Title>
            <Link
              variant="elevated"
              size="sm"
              href="https://www.asu.ru/news/"
              target="_blank"
            >
              Посмотреть все
              <IconRightArrowAlt />
            </Link>
          </Section.Header>
          <Section.Content>
            <NewsFeed />
          </Section.Content>
        </Section>
        <Section>
          <Section.Header>
            <Section.Title>
              <IconCalendar /> Календарь
            </Section.Title>
          </Section.Header>
          <Section.Content>
            <Calendar />
          </Section.Content>
        </Section>
        <Section>
          <Section.Header>
            <Section.Title>Не знаешь с чего начать?</Section.Title>
          </Section.Header>
          <Section.Content>
            <iframe
              className={styles.videoFrame}
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/j70dL0JZXGI?si=S8Gad7Il1421X1mJ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Section.Content>
        </Section>
      </Section.Group>
    </main>
  )
}

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default HomePage
