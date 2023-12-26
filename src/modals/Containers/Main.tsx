import Modal from "~/components/ui/Modal"
import ChatModal from "~/modals/Chat"
import DeleteNotificationsModal from "~/modals/DeleteNotifications"
import SidebarModal from "~/modals/Sidebar"
import SignInModal from "~/modals/SignIn"
import SignOutModal from "~/modals/SignOut"

const MainModalContainer: React.FC = () => {
  return (
    <Modal.Container>
      <SidebarModal />
      <SignInModal />
      <SignOutModal />
      <ChatModal />
      <DeleteNotificationsModal />
    </Modal.Container>
  )
}

export default MainModalContainer
