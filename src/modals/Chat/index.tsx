import Modal from "~/components/ui/Modal"
import { useModalStore } from "~/store/modal"
import { ModalKeyMap } from "~/utils/enums"

const ChatModal: React.FC = () => {
  const modalStore = useModalStore()
  const isModalOpen = modalStore.queue.at(-1) === ModalKeyMap.Chat
  const closeModalHandler = () => modalStore.close(ModalKeyMap.Chat)

  return (
    <Modal state={isModalOpen} asDrawer>
      <Modal.Header>
        <Modal.Title>Сообщения</Modal.Title>
        <Modal.Close onClick={closeModalHandler} />
      </Modal.Header>
      <Modal.Content>
        <ul>
          <li>Чат 1</li>
          <li>Чат 2</li>
          <li>Чат 3</li>
          <li>Чат 4</li>
        </ul>
      </Modal.Content>
    </Modal>
  )
}

export default ChatModal
