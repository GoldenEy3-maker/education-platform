import { useRef } from "react"
import Button from "~/components/ui/Button"
import { IconPlus, IconSearch } from "~/components/ui/Icons"
import Modal from "~/components/ui/Modal"
import TextField from "~/components/ui/TextField"
import UserAvatar from "~/components/ui/UserAvatar"
import { useAutoFocus } from "~/hooks/autoFocus.hook"
import { useModalStore } from "~/store/modal"
import { useSessionStore } from "~/store/session"
import { api } from "~/utils/api"
import { ModalKeyMap } from "~/utils/enums"
import styles from "./styles.module.sass"

const ChatModal: React.FC = () => {
  const modalStore = useModalStore()
  const sessionStore = useSessionStore()

  const searchRef = useRef<HTMLInputElement>(null)

  const isModalOpen = modalStore.queue.at(-1) === ModalKeyMap.Chat
  const closeModalHandler = () => modalStore.close(ModalKeyMap.Chat)

  const getAllUsersQuery = api.user.getAll.useQuery(undefined, {
    enabled: isModalOpen,
  })

  api.user.connect.useQuery()

  api.user.onConnect.useSubscription(
    {
      userId: sessionStore.user?.id ?? null,
    },
    {
      onData() {
        void getAllUsersQuery.refetch()
      },
      onError(err) {
        console.log("🚀 ~ file: PopoverProfile.tsx:47 ~ onError ~ err:", err)
      },
    }
  )

  useAutoFocus(searchRef, isModalOpen)

  return (
    <Modal isOpen={isModalOpen} asDrawer wrapperClassName={styles.modal}>
      <Modal.Header>
        <Modal.Title>Сообщения</Modal.Title>
        <Modal.Close onClick={closeModalHandler} />
      </Modal.Header>
      <Modal.Body className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <TextField
              placeholder="Поиск"
              leadingIcon={<IconSearch />}
              ref={searchRef}
            />
          </div>
          {!getAllUsersQuery.isLoading ? (
            <>
              <ul className={styles.usersList}>
                {/* {getAllUsersQuery.data?.map((user) => (
                <li key={user.id} className={styles.user}>
                  <Button>
                    {user.surname} {user.name}
                  </Button>
                </li>
              ))} */}
                <li className={styles.user}>
                  <Button color="default">
                    <UserAvatar className={styles.userAvatar} />
                    <strong className={styles.userCredentials}>
                      Иванов Иван
                    </strong>
                    <time dateTime="" className={styles.time}>
                      20:00
                    </time>
                    <p className={styles.userLastMessage}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quam corrupti illum iusto error voluptatum cupiditate
                      perferendis earum dignissimos nemo iste dolore ex
                      mollitia, quas distinctio quo aut maxime eos minima.
                    </p>
                  </Button>
                </li>
                <li className={styles.user}>
                  <Button color="default">
                    <UserAvatar className={styles.userAvatar} />
                    <strong className={styles.userCredentials}>
                      Королев Данил
                    </strong>
                    <time dateTime="" className={styles.time}>
                      20:00
                    </time>
                    <p className={styles.userLastMessage}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quam corrupti illum iusto error voluptatum cupiditate
                      perferendis earum dignissimos nemo iste dolore ex
                      mollitia, quas distinctio quo aut maxime eos minima.
                    </p>
                  </Button>
                </li>
                <li className={styles.user}>
                  <Button color="default">
                    <UserAvatar className={styles.userAvatar} />
                    <strong className={styles.userCredentials}>
                      Дмитриева Анастасия
                    </strong>
                    <time dateTime="" className={styles.time}>
                      20:00
                    </time>
                    <p className={styles.userLastMessage}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quam corrupti illum iusto error voluptatum cupiditate
                      perferendis earum dignissimos nemo iste dolore ex
                      mollitia, quas distinctio quo aut maxime eos minima.
                    </p>
                  </Button>
                </li>
                <li className={styles.user}>
                  <Button color="default">
                    <UserAvatar className={styles.userAvatar} />
                    <strong className={styles.userCredentials}>
                      Гэхтерштермэгэбэкова Иван
                    </strong>
                    <time dateTime="" className={styles.time}>
                      20:00
                    </time>
                    <p className={styles.userLastMessage}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quam corrupti illum iusto error voluptatum cupiditate
                      perferendis earum dignissimos nemo iste dolore ex
                      mollitia, quas distinctio quo aut maxime eos minima.
                    </p>
                  </Button>
                </li>
                <li className={styles.user}>
                  <Button color="default">
                    <UserAvatar className={styles.userAvatar} />
                    <strong className={styles.userCredentials}>
                      Иванов Иван
                    </strong>
                    <time dateTime="" className={styles.time}>
                      20:00
                    </time>
                    <p className={styles.userLastMessage}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quam corrupti illum iusto error voluptatum cupiditate
                      perferendis earum dignissimos nemo iste dolore ex
                      mollitia, quas distinctio quo aut maxime eos minima.
                    </p>
                  </Button>
                </li>
                <li className={styles.user}>
                  <Button color="default">
                    <UserAvatar className={styles.userAvatar} />
                    <strong className={styles.userCredentials}>
                      Иванов Иван
                    </strong>
                    <time dateTime="" className={styles.time}>
                      20:00
                    </time>
                    <p className={styles.userLastMessage}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quam corrupti illum iusto error voluptatum cupiditate
                      perferendis earum dignissimos nemo iste dolore ex
                      mollitia, quas distinctio quo aut maxime eos minima.
                    </p>
                  </Button>
                </li>
                <li className={styles.user}>
                  <Button color="default">
                    <UserAvatar className={styles.userAvatar} />
                    <strong className={styles.userCredentials}>
                      Иванов Иван
                    </strong>
                    <time dateTime="" className={styles.time}>
                      20:00
                    </time>
                    <p className={styles.userLastMessage}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quam corrupti illum iusto error voluptatum cupiditate
                      perferendis earum dignissimos nemo iste dolore ex
                      mollitia, quas distinctio quo aut maxime eos minima.
                    </p>
                  </Button>
                </li>
                <li className={styles.user}>
                  <Button color="default">
                    <UserAvatar className={styles.userAvatar} />
                    <strong className={styles.userCredentials}>
                      Иванов Иван
                    </strong>
                    <time dateTime="" className={styles.time}>
                      20:00
                    </time>
                    <p className={styles.userLastMessage}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quam corrupti illum iusto error voluptatum cupiditate
                      perferendis earum dignissimos nemo iste dolore ex
                      mollitia, quas distinctio quo aut maxime eos minima.
                    </p>
                  </Button>
                </li>
                <li className={styles.user}>
                  <Button color="default">
                    <UserAvatar className={styles.userAvatar} />
                    <strong className={styles.userCredentials}>
                      Иванов Иван
                    </strong>
                    <time dateTime="" className={styles.time}>
                      20:00
                    </time>
                    <p className={styles.userLastMessage}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quam corrupti illum iusto error voluptatum cupiditate
                      perferendis earum dignissimos nemo iste dolore ex
                      mollitia, quas distinctio quo aut maxime eos minima.
                    </p>
                  </Button>
                </li>
              </ul>
            </>
          ) : (
            <p>Загрузка</p>
          )}
          <Button className={styles.floatingButton} variant="filled" asIcon>
            <IconPlus />
          </Button>
        </div>
        <div className={styles.chat}></div>
      </Modal.Body>
    </Modal>
  )
}

export default ChatModal
