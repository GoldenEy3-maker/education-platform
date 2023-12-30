import Modal from "~/components/ui/Modal"
import SidebarModal from "~/modals/Sidebar"
import SignInModal from "~/modals/SignIn"
import { useSessionStore } from "~/store/session"
import ChatModal from "../Chat"
import DeleteNotificationsModal from "../DeleteNotifications"
import SignOutModal from "../SignOut"

const MainModalContainer: React.FC = () => {
  const sessionStore = useSessionStore()

  return (
    <Modal.Container>
      <SidebarModal />
      <SignInModal />
      {sessionStore.user ? (
        <>
          <SignOutModal />
          <ChatModal />
          <DeleteNotificationsModal />
        </>
      ) : null}
    </Modal.Container>
  )
}

export default MainModalContainer
