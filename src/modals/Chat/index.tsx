import Button from "~/components/ui/Button"
import Modal from "~/components/ui/Modal"
import { useModalStore } from "~/store/modal"
import { api } from "~/utils/api"
import { ModalKeyMap } from "~/utils/enums"
import styles from "./styles.module.sass"

const ChatModal: React.FC = () => {
  const modalStore = useModalStore()
  const isModalOpen = modalStore.queue.at(-1) === ModalKeyMap.Chat
  const closeModalHandler = () => modalStore.close(ModalKeyMap.Chat)

  const getAllUsersQuery = api.user.getAll.useQuery(undefined, {
    enabled: isModalOpen,
  })

  return (
    <Modal isOpen={isModalOpen} asDrawer wrapperClassName={styles.modal}>
      <Modal.Header>
        <Modal.Title>Сообщения</Modal.Title>
        <Modal.Close onClick={closeModalHandler} />
      </Modal.Header>
      <Modal.Content className={styles.content}>
        <div className={styles.sidebar}>
          {!getAllUsersQuery.isLoading ? (
            <ul className={styles.usersList}>
              {getAllUsersQuery.data?.map((user) => (
                <li key={user.id} className={styles.user}>
                  <Button>
                    {user.surname} {user.name}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Загрузка</p>
          )}
        </div>
        <div className={styles.chat}></div>
      </Modal.Content>
    </Modal>
  )
}

export default ChatModal
