import dayjs from "dayjs"
import NextLink from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import Button from "~/components/ui/Button"
import {
  IconBell,
  IconCheckSqure,
  IconSolidAlarm,
  IconTrash,
} from "~/components/ui/Icons"
import Popover from "~/components/ui/Popover"
import Tabs from "~/components/ui/Tabs"
import UserAvatar from "~/components/ui/UserAvatar"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { useModalStore } from "~/store/modal"
import { useSessionStore } from "~/store/session"
import { api } from "~/utils/api"
import {
  ModalKeyMap,
  PagePathMap,
  type NotificationTypeMap,
} from "~/utils/enums"
import { cls } from "~/utils/func"
import styles from "./PopoverNotifications.module.sass"
import LoadingSkeleton from "./PopoverNotifications.skeleton"

const tableNotificationTextByType: Record<NotificationTypeMap, string> = {
  "course-publish": "оставил(а) уведомление",
  "new-course-Element": "выложил(а) новое задание",
  "open-curse-element": "открыл(а) задание",
  review: "оставил(а) отзыв на",
}

const tableNotificationTabLabelByType: Record<NotificationTypeMap, string> = {
  review: "Отзывы",
  "course-publish": "Публикации",
  "new-course-Element": "Новые задания",
  "open-curse-element": "Открытые задания",
}

const PopoverNotifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NotificationTypeMap | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const modalStore = useModalStore()
  const sessionStore = useSessionStore()
  const rippleEffectEvent = useRippleEffect()

  const closePopoverHandler = () => setIsPopoverOpen(false)

  const togglePopoverHandler = () => setIsPopoverOpen((prevState) => !prevState)

  const getNotificationsBySessionQuery =
    api.notification.getBySession.useQuery()

  api.notification.onSend.useSubscription(
    { userId: sessionStore.user?.id ?? null },
    {
      onData() {
        void getNotificationsBySessionQuery.refetch()
      },
      onError(err) {
        console.error("🚀 ~ file: index.tsx:41 ~ onError ~ err:", err)
      },
    }
  )

  const readNotification = api.notification.read.useMutation({
    onSuccess(data) {
      if (Array.isArray(data)) {
        toast.success("Все уведомления прочитаны.")
      }

      void getNotificationsBySessionQuery.refetch()
    },
    onError(err) {
      console.error("🚀 ~ file: index.tsx:57 ~ onError ~ err:", err)
      toast.error(err.message)
    },
  })

  return (
    <Popover closeHandler={closePopoverHandler} isUseTabs>
      <Popover.Trigger
        type="button"
        asIcon
        color="default"
        onClick={togglePopoverHandler}
        isActive={isPopoverOpen}
        counter={
          getNotificationsBySessionQuery.data?.filter(
            (notification) => notification.isRead === false
          ).length
        }
      >
        <IconBell />
      </Popover.Trigger>
      <Popover.Wrapper isOpen={isPopoverOpen}>
        <Popover.Header>
          <Popover.Title>Уведомления</Popover.Title>
          <Popover.Actions>
            <Button
              type="button"
              loading={readNotification.isLoading}
              asIcon
              onClick={() => readNotification.mutate()}
              title="Пометить все, как прочитанное"
              disabled={
                getNotificationsBySessionQuery.isLoading ||
                !getNotificationsBySessionQuery.data ||
                getNotificationsBySessionQuery.data.length === 0
              }
            >
              <IconCheckSqure />
            </Button>
            <Button
              asIcon
              type="button"
              color="danger"
              title="Удалить все"
              onClick={(event) =>
                modalStore.open({
                  key: ModalKeyMap.DeleteNotifications,
                  target: event.currentTarget,
                })
              }
              disabled={
                getNotificationsBySessionQuery.isLoading ||
                !getNotificationsBySessionQuery.data ||
                getNotificationsBySessionQuery.data.length === 0
              }
            >
              <IconTrash />
            </Button>
          </Popover.Actions>
        </Popover.Header>
        <Tabs>
          <Tabs.Track>
            <Tabs.Item
              id="all"
              label="Все"
              isActive={activeTab === null}
              onChange={() => setActiveTab(null)}
              name="notification-tabs"
            />
            {Object.keys(tableNotificationTabLabelByType).map((key) => (
              <Tabs.Item
                key={key}
                id={key}
                label={
                  tableNotificationTabLabelByType[key as NotificationTypeMap]
                }
                name="notification-tabs"
                isActive={activeTab === (key as NotificationTypeMap)}
                onChange={() => setActiveTab(key as NotificationTypeMap)}
              />
            ))}
          </Tabs.Track>
        </Tabs>
        <Popover.Content className={styles.content}>
          {(() => {
            if (getNotificationsBySessionQuery.isLoading)
              return <LoadingSkeleton />

            if (!getNotificationsBySessionQuery.data?.length)
              return (
                <div className={styles.empty}>
                  <span>
                    <IconSolidAlarm />
                  </span>
                  <p>У вас пока нет уведомлений.</p>
                  <p>Возвращайтесь позже.</p>
                </div>
              )

            const filteredDataByTabs = activeTab
              ? getNotificationsBySessionQuery.data.filter(
                  (notification) => notification.type === activeTab
                )
              : getNotificationsBySessionQuery.data

            const sortedDataByCreatedAt = filteredDataByTabs.sort((a, b) => {
              const dateA = new Date(a.createdAt).getTime()
              const dateB = new Date(b.createdAt).getTime()

              return dateB - dateA
            })

            if (!filteredDataByTabs.length)
              return (
                <div className={styles.empty}>
                  <span>
                    <IconSolidAlarm />
                  </span>
                  <p>В этом разделе ничего нет.</p>
                  <p>Попробуйте другой.</p>
                </div>
              )

            return (
              <ul className={styles.list}>
                {sortedDataByCreatedAt.map((notification) => (
                  <li key={notification.id}>
                    <NextLink
                      href={PagePathMap.HomePage}
                      onPointerDown={rippleEffectEvent}
                      className={cls(styles.item, {
                        [styles._notReaded ?? ""]: !notification.isRead,
                      })}
                      onClick={() => {
                        if (!notification.isRead)
                          readNotification.mutate({ id: notification.id })
                      }}
                      title={`${notification.sender.name} ${
                        tableNotificationTextByType[notification.type]
                      } ${notification.target} (${notification.subject})`}
                    >
                      <div className={styles.avatar}>
                        <UserAvatar src={notification.sender.avatar} />
                      </div>
                      <p className={styles.text}>
                        <strong>{notification.sender.name}</strong>
                        &nbsp;{tableNotificationTextByType[notification.type]}
                        &nbsp;
                        <strong>{notification.target}</strong>
                      </p>
                      <p className={styles.extraInfo}>
                        <time
                          dateTime={dayjs(notification.createdAt).toISOString()}
                        >
                          {dayjs().to(dayjs(notification.createdAt))}
                        </time>
                        <i></i>
                        <span>{notification.subject}</span>
                      </p>
                    </NextLink>
                  </li>
                ))}
              </ul>
            )
          })()}
        </Popover.Content>
      </Popover.Wrapper>
    </Popover>
  )
}

export default PopoverNotifications
