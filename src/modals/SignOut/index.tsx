import { useRouter } from "next/router"
import { useRef } from "react"
import toast from "react-hot-toast"
import Button from "~/components/ui/Button"
import Modal from "~/components/ui/Modal"
import { useAutoFocus } from "~/hooks/autoFocus.hook"
import { useModalStore } from "~/store/modal"
import { useSessionStore } from "~/store/session"
import { api } from "~/utils/api"
import { ModalKeyMap, PagePathMap } from "~/utils/enums"

const SignOutModal: React.FC = () => {
  const router = useRouter()
  const modalStore = useModalStore()
  const sessionStore = useSessionStore()
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const closeModalHandler = () => modalStore.close()

  const isModalOpen = modalStore.queue.at(-1) === ModalKeyMap.SignOut

  const signOut = api.auth.signOut.useMutation({
    onSuccess() {
      void router.push(PagePathMap.HomePage)
      sessionStore.clear()
      modalStore.close(ModalKeyMap.SignOut)
    },
    onError(error) {
      console.error("🚀 ~ file: index.tsx:24 ~ onError ~ error:", error)
      toast.error(error.message)
    },
  })

  useAutoFocus(cancelButtonRef, isModalOpen)

  return (
    <Modal state={isModalOpen}>
      <Modal.Header>
        <Modal.Title>Вы действительно хотите выйти?</Modal.Title>
        <Modal.Close onClick={closeModalHandler} />
      </Modal.Header>
      <Modal.Content>
        Вы можете покинуть этот аккаунт. После чего перейдете в режим гостя, в
        котором ограничен доступ ко многим элементам портала.
      </Modal.Content>
      <Modal.Footer>
        <Button
          type="button"
          onClick={closeModalHandler}
          textAlign="center"
          ref={cancelButtonRef}
          disabled={signOut.isLoading}
        >
          Отмена
        </Button>
        <Button
          variant="filled"
          color="danger"
          type="button"
          textAlign="center"
          onClick={() => signOut.mutate()}
          disabled={signOut.isLoading}
          loading={signOut.isLoading}
        >
          Выйти
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SignOutModal
