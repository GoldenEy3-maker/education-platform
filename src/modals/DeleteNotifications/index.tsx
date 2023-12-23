import { useRef } from "react"
import toast from "react-hot-toast"
import Button from "~/components/ui/Button"
import Modal from "~/components/ui/Modal"
import { useAutoFocus } from "~/hooks/autoFocus.hook"
import { useModalStore } from "~/store/modal"
import { api } from "~/utils/api"
import { ModalKeyMap } from "~/utils/enums"

const DeleteNotificationsModal = () => {
  const modalStore = useModalStore()

  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const isModalOpen =
    modalStore.queue.at(-1) === ModalKeyMap.DeleteNotifications

  const closeModalHandler = () =>
    modalStore.close(ModalKeyMap.DeleteNotifications)

  const getNotificationsQuery = api.notification.getBySession.useQuery()

  const clearNotifications = api.notification.clear.useMutation({
    onSuccess() {
      toast.success("Уведомления успешно удалены.")
      void getNotificationsQuery.refetch()
      closeModalHandler()
    },
    onError(error) {
      console.error("🚀 ~ file: index.tsx:20 ~ onError ~ error:", error)
      toast.error(error.message)
    },
  })

  useAutoFocus(cancelButtonRef, isModalOpen)

  return (
    <Modal state={isModalOpen}>
      <Modal.Header>
        <Modal.Title>Удалить уведомления</Modal.Title>
        <Modal.Close onClick={closeModalHandler} />
      </Modal.Header>
      <Modal.Content>
        <p>Данные пропадут безвозвратно!</p>
        <p>Это действие нельзя будет отменить.</p>
      </Modal.Content>
      <Modal.Footer>
        <Button
          type="button"
          ref={cancelButtonRef}
          onClick={closeModalHandler}
          disabled={clearNotifications.isLoading}
        >
          Отмена
        </Button>
        <Button
          type="button"
          color="danger"
          variant="filled"
          disabled={clearNotifications.isLoading}
          loading={clearNotifications.isLoading}
          onClick={() => clearNotifications.mutate()}
        >
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteNotificationsModal
