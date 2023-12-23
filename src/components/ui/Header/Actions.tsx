import Button from "~/components/ui/Button"
import { IconChat, IconUser } from "~/components/ui/Icons"
import { useModalStore } from "~/store/modal"
import { useSessionStore } from "~/store/session"
import { api } from "~/utils/api"
import { ModalKeyMap } from "~/utils/enums"
import styles from "./Actions.module.sass"
import LoadingSkeleton from "./Actions.skeleton"
import PopoverNotifications from "./PopoverNotifications"
import PopoverProfile from "./PopoverProfile"

const Actions: React.FC = () => {
  const modalStore = useModalStore()
  const sessionStore = useSessionStore()

  const getSessionQuery = api.auth.getSession.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  return (
    <div className={styles.actions}>
      {!getSessionQuery.isLoading ? (
        sessionStore.token ? (
          <>
            <PopoverNotifications />
            <Button
              type="button"
              asIcon
              color="default"
              onClick={(event) =>
                modalStore.open({
                  key: ModalKeyMap.Chat,
                  target: event.currentTarget,
                })
              }
            >
              <IconChat />
            </Button>
            <PopoverProfile />
          </>
        ) : (
          <Button
            className={styles.singinButton}
            variant="outlined"
            onClick={(event) =>
              modalStore.open({
                key: ModalKeyMap.SignIn,
                target: event.currentTarget,
              })
            }
          >
            <IconUser />
            Войти
          </Button>
        )
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  )
}

export default Actions
