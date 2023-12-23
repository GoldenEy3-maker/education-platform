import { useState } from "react"
import Button from "~/components/ui/Button"
import Checkbox from "~/components/ui/Checkbox"
import {
  IconCalendar,
  IconCog,
  IconFolder,
  IconLogOut,
  IconMoon,
} from "~/components/ui/Icons"
import Link from "~/components/ui/Link"
import Popover from "~/components/ui/Popover"
import UserAvatar from "~/components/ui/UserAvatar"
import { useLocalStorage } from "~/hooks/localStorage.hook"
import { useModalStore } from "~/store/modal"
import { useSessionStore } from "~/store/session"
import { LocalStorageKeyMap, ModalKeyMap, PagePathMap } from "~/utils/enums"
import styles from "./PopoverProfile.module.sass"

const PopoverProfile: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const sessionStore = useSessionStore()
  const modalStore = useModalStore()

  const closePopoverHandler = () => setIsPopoverOpen(false)

  const togglePopoverHandler = () => setIsPopoverOpen((prevState) => !prevState)

  const [isDarkTheme, setIsDarkTheme] = useLocalStorage(
    LocalStorageKeyMap.isDarkTheme,
    false
  )

  return (
    <Popover closeHandler={closePopoverHandler}>
      <Popover.Trigger variant="filled" asIcon onClick={togglePopoverHandler}>
        <UserAvatar />
      </Popover.Trigger>
      <Popover.Wrapper isOpen={isPopoverOpen}>
        <Popover.Content>
          <div className={styles.profile}>
            <div className={styles.profileImg}>
              <span>
                <UserAvatar src={sessionStore.user?.avatar} />
              </span>
            </div>
            <p className={styles.credentials}>
              <strong>
                {sessionStore.user?.surname}&nbsp;{sessionStore.user?.name}
                &nbsp;
                {sessionStore.user?.patronymic}
              </strong>
              &nbsp;
              <span className={styles.credentialsRole}>
                {sessionStore.user?.role}
              </span>
            </p>
            <p className={styles.profileEmail}>
              {sessionStore.user?.email ?? "Email не привязан"}
            </p>
          </div>
          <nav className={styles.nav}>
            <Checkbox
              label="Темная тема"
              type="switch"
              leadingIcon={<IconMoon />}
              controllerPosition="right"
              checked={isDarkTheme}
              name="change-theme"
              id="change-theme"
              className={styles.themeController}
              onChange={(checked) => setIsDarkTheme(checked)}
            />
            <hr />
            <Link
              color="default"
              href={PagePathMap.CoursesPage}
              className={styles.navLink}
            >
              <IconFolder /> <span>Курсы</span>
            </Link>
            <Link
              color="default"
              href={PagePathMap.SchedulerPage}
              className={styles.navLink}
            >
              <IconCalendar /> <span>Расписание</span>
            </Link>
            <Link
              color="default"
              href={PagePathMap.SettingsPage}
              className={styles.navLink}
            >
              <IconCog /> <span>Настройки</span>
            </Link>
            <hr />
            <Button
              type="button"
              color="danger"
              className={styles.navLink}
              onClick={(event) => {
                modalStore.open({
                  key: ModalKeyMap.SignOut,
                  target: event.currentTarget,
                })
              }}
            >
              <IconLogOut /> <span>Выход</span>
            </Button>
          </nav>
        </Popover.Content>
      </Popover.Wrapper>
    </Popover>
  )
}

export default PopoverProfile
