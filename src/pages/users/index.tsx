import { useState } from "react"
import toast from "react-hot-toast"
import Button from "~/components/ui/Button"
import Section from "~/components/ui/Section"
import Tabs from "~/components/ui/Tabs"
import MainLayout from "~/layouts/Main"
import { api } from "~/utils/api"
import { type NextPageWithLayout } from "../_app"

const tableTestTabLabel = {
  testReview: "Отзывы",
  test: "Тесты",
  publish: "Публикация",
  tasks: "Задания",
  statistic: "Статистика",
}

const UsersPage: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] =
    useState<keyof typeof tableTestTabLabel>("testReview")

  const getUsers = api.user.getAll.useQuery()

  const testSend = api.notification.send.useMutation({
    onSuccess() {
      toast.success("Уведомление успешно отправлено!")
    },
    onError(err) {
      console.log("🚀 ~ file: index.tsx:16 ~ onError ~ err:", err)
      toast.error(err.message)
    },
  })
  return (
    <main className="content-grid">
      <Section>
        <Section.Title>Страница пользователей</Section.Title>
        <Section.Content>
          <Tabs>
            <Tabs.Track>
              {Object.keys(tableTestTabLabel).map((key) => (
                <Tabs.Item
                  key={key}
                  id={key}
                  label={
                    tableTestTabLabel[key as keyof typeof tableTestTabLabel]
                  }
                  isActive={activeTab === key}
                  onChange={() =>
                    setActiveTab(key as keyof typeof tableTestTabLabel)
                  }
                  name="test"
                />
              ))}
            </Tabs.Track>
          </Tabs>
          <ul>
            {getUsers.data?.map((user) => (
              <li key={user.id}>
                <p>
                  {user.surname} {user.name} {user.patronymic}
                </p>
                <Button
                  type="button"
                  variant="filled"
                  onClick={() =>
                    testSend.mutate({
                      link: "/",
                      subject: "МЕНПД",
                      target: "Лабораторная работа №2",
                      recipientId: user.id,
                      type: "open-curse-element",
                    })
                  }
                >
                  Отправить
                </Button>
              </li>
            ))}
          </ul>
        </Section.Content>
      </Section>
    </main>
  )
}

UsersPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default UsersPage
