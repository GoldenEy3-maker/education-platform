import Link from "~/components/ui/Link"
import { useSidebarStore } from "~/store/sidebar"
import { PagePathMap } from "~/utils/enums"
import { cls } from "~/utils/func"
import Button from "../Button"
import {
  IconCalendar,
  IconChevronDown,
  IconCog,
  IconFolder,
  IconGroup,
  IconHelpCircle,
  IconHome,
  IconSolidCalendar,
  IconSolidCog,
  IconSolidFolder,
  IconSolidGroup,
  IconSolidHelpCircle,
  IconSolidHome,
} from "../Icons"
import styles from "./styles.module.sass"

type SidebarProps = {
  isModal?: boolean
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const sidebarStore = useSidebarStore()

  const isExpanded = props.isModal ? true : sidebarStore.isExpanded

  return (
    <aside
      role="aside"
      className={cls(styles.aside, {
        [styles._modal ?? ""]: !!props.isModal,
      })}
      aria-expanded={isExpanded}
    >
      <nav className={styles.nav}>
        <div className={styles.navGroup}>
          <Link
            href={PagePathMap.HomePage}
            activeClassName={styles.activeNavLink}
            className={styles.navLink}
            color="default"
          >
            {(isActive) => (
              <>
                {isActive ? <IconSolidHome /> : <IconHome />}
                <span>Главная</span>
              </>
            )}
          </Link>
          <Link
            href={PagePathMap.UsersPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            color="default"
          >
            {(isActive) => (
              <>
                {isActive ? <IconSolidGroup /> : <IconGroup />}
                <span>Люди</span>
              </>
            )}
          </Link>
          <Link
            href={PagePathMap.SchedulerPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            color="default"
          >
            {(isActive) => (
              <>
                {isActive ? <IconSolidCalendar /> : <IconCalendar />}
                <span>Календарь</span>
              </>
            )}
          </Link>
        </div>
        <div className={styles.navGroup}>
          <span className={styles.navGroupLabel}>Курсы</span>
          <div className={styles.navGroupList}>
            <Link
              href={PagePathMap.CoursesPage + "/1"}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
              color="default"
            >
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link>
            <Link
              href={PagePathMap.CoursesPage + "/1"}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
              color="default"
            >
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link>
            <Link
              href={PagePathMap.CoursesPage + "/1"}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
              color="default"
            >
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link>
            <Link
              href={PagePathMap.CoursesPage + "/1"}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
              color="default"
            >
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link>
            <Link
              href={PagePathMap.CoursesPage + "/1"}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
              color="default"
            >
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link>
            <Link
              href={PagePathMap.CoursesPage + "/1"}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
              color="default"
            >
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link>
            <Link
              href={PagePathMap.CoursesPage + "/1"}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
              color="default"
            >
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link>

            <Button className={styles.navLink} color="default">
              <IconChevronDown />
              <span>Раскрыть</span>
            </Button>
          </div>
        </div>
        <div className={styles.navGroup}>
          <Link
            href={PagePathMap.SettingsPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            color="default"
          >
            {(isActive) => (
              <>
                {isActive ? <IconSolidCog /> : <IconCog />}
                <span>Настройки</span>
              </>
            )}
          </Link>
          <Link
            href={PagePathMap.SupportPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            color="default"
          >
            {(isActive) => (
              <>
                {isActive ? <IconSolidHelpCircle /> : <IconHelpCircle />}
                <span>Поддержка</span>
              </>
            )}
          </Link>
        </div>
      </nav>
      <nav className={cls(styles.nav, styles._shrinked)}>
        <div className={styles.navGroup}>
          <Link
            href={PagePathMap.HomePage}
            activeClassName={styles.activeNavLink}
            className={styles.navLink}
            color="default"
          >
            {(isActive) => (
              <>
                {isActive ? <IconSolidHome /> : <IconHome />}
                <span>Главная</span>
              </>
            )}
          </Link>
          <Link
            href={PagePathMap.CoursesPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            color="default"
          >
            {(isActive) => (
              <>
                {isActive ? <IconSolidFolder /> : <IconFolder />}
                <span>Курсы</span>
              </>
            )}
          </Link>
          <Link
            href={PagePathMap.UsersPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            color="default"
          >
            {(isActive) => (
              <>
                {isActive ? <IconSolidGroup /> : <IconGroup />}
                <span>Люди</span>
              </>
            )}
          </Link>
          <Link
            href={PagePathMap.SchedulerPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            color="default"
          >
            {(isActive) => (
              <>
                {isActive ? <IconSolidCalendar /> : <IconCalendar />}
                <span>Календарь</span>
              </>
            )}
          </Link>
          <Link
            href={PagePathMap.SupportPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            color="default"
          >
            {(isActive) => (
              <>
                {isActive ? <IconSolidHelpCircle /> : <IconHelpCircle />}
                <span>Поддержка</span>
              </>
            )}
          </Link>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
