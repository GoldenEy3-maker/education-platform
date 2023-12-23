import Image from "next/image"
import HeaderLogo from "~/assets/header_logo_resized.png"
import Modal from "~/components/ui/Modal"
import Sidebar from "~/components/ui/Sidebar"
import { useRouterChangeEvent } from "~/hooks/routerEvent.hook"
import { useModalStore } from "~/store/modal"
import { ModalKeyMap } from "~/utils/enums"

const SidebarModal: React.FC = () => {
  const modalStore = useModalStore()

  const isModalOpen = modalStore.queue.at(-1) === ModalKeyMap.Sidebar

  useRouterChangeEvent(() => modalStore.close(ModalKeyMap.Sidebar))

  return (
    <Modal state={isModalOpen} asDrawer position="left">
      <Modal.Header isJustifyContentStart>
        <Modal.Close onClick={() => modalStore.close(ModalKeyMap.Sidebar)} />
        <Image
          src={HeaderLogo}
          alt="Логотоп АлтГУ"
          width={HeaderLogo.width}
          height={HeaderLogo.height}
        />
        <Modal.Title>Цифровой университет АлтГУ</Modal.Title>
      </Modal.Header>
      <Modal.Content>
        <Sidebar isModal />
      </Modal.Content>
    </Modal>
  )
}

export default SidebarModal
