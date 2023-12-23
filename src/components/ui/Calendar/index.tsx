import dayjs from "dayjs"
import { useRouter } from "next/router"
import { useMemo, useRef, useState } from "react"
import { cls, toUpperCaseInitialLetter } from "~/utils/func"
import Button from "../Button"
import { IconLeftArrowAlt, IconRightArrowAlt } from "../Icons"
import styles from "./styles.module.sass"

type CalendarProps = {
  date?: Date
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const [currentDate, setCurrentDate] = useState(dayjs(props.date))
  const [selectedDate, setSelectedDate] = useState(dayjs(props.date))

  const daysMainRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  const startCurrentMonth = currentDate.startOf("month")
  const endCurrentMonth = currentDate.endOf("month")
  const daysCurrentMonth = endCurrentMonth.diff(startCurrentMonth, "day") + 1

  const nextMonth = currentDate.add(1, "month")
  const startNextMonth = nextMonth.startOf("month")
  const prevMonth = currentDate.subtract(1, "month")
  const endPrevMonth = prevMonth.endOf("month")

  const days = useMemo(() => {
    let weekDayStartCurrentMonth = startCurrentMonth.day() - 1

    if (weekDayStartCurrentMonth < 0) weekDayStartCurrentMonth = 6

    const res: dayjs.Dayjs[] = []
    const weekDayEndCurrentMonth = 7 - endCurrentMonth.day()
    const startPrefixDate = endPrevMonth.date() - (weekDayStartCurrentMonth - 1)
    let prefixCount = endPrevMonth.date() - startPrefixDate
    let suffixCount = 0
    let isNotFilled = true

    if (
      ((startCurrentMonth.day() === 6 || startCurrentMonth.day() === 0) &&
        daysCurrentMonth >= 30) ||
      (startCurrentMonth.day() === 5 && daysCurrentMonth === 31)
    )
      isNotFilled = false

    for (let i = startPrefixDate; i <= endPrevMonth.date(); i++) {
      res.push(endPrevMonth.subtract(prefixCount, "day"))
      prefixCount--
    }

    for (let i = startCurrentMonth.date(); i <= endCurrentMonth.date(); i++) {
      res.push(startCurrentMonth.add(i - 1, "day"))
    }

    for (
      let i = startNextMonth.date();
      i <
      startNextMonth.date() + weekDayEndCurrentMonth + (isNotFilled ? 7 : 0);
      i++
    ) {
      res.push(startNextMonth.add(suffixCount, "day"))
      suffixCount++
    }

    return res
  }, [
    daysCurrentMonth,
    endCurrentMonth,
    endPrevMonth,
    startCurrentMonth,
    startNextMonth,
  ])

  const goToPrevDate = () => {
    setCurrentDate((prev) => prev.subtract(1, "month"))
  }

  const goToNextDate = () => {
    setCurrentDate((prev) => prev.add(1, "month"))
  }

  const getDayButtonsVariant = (day: dayjs.Dayjs) => {
    if (day.isSame(selectedDate, "date") && day.month() === currentDate.month())
      return "filled"

    if (day.isSame(dayjs(props.date), "date")) return "outlined"

    return undefined
  }

  const getDayButtonsColor = (day: dayjs.Dayjs) => {
    if (day.day() === 0 && day.month() === currentDate.month()) {
      return "danger"
    }

    return "primary"
  }

  const selectDay = (day: dayjs.Dayjs) => {
    setSelectedDate(day)
    setCurrentDate((prev) => prev.set("month", day.month()))
  }

  return (
    <div>
      <header className={styles.header}>
        <span className={styles.headerCurr}>
          {toUpperCaseInitialLetter(
            new Intl.DateTimeFormat(router.locale, { month: "long" }).format(
              currentDate.toDate()
            )
          ) +
            " " +
            currentDate.year()}
        </span>
        <div className={styles.headerActions}>
          <Button
            asIcon
            type="button"
            onClick={goToPrevDate}
            title="Предыдущий месяц"
          >
            <IconLeftArrowAlt />
          </Button>
          <Button
            asIcon
            type="button"
            onClick={goToNextDate}
            title="Следующий месяц"
          >
            <IconRightArrowAlt />
          </Button>
        </div>
      </header>
      <div className={styles.main}>
        <div ref={daysMainRef}>
          <div className={styles.weeks}>
            <span>Пн</span>
            <span>Вт</span>
            <span>Ср</span>
            <span>Чт</span>
            <span>Пт</span>
            <span>Сб</span>
            <span>Вс</span>
          </div>
          <div className={styles.daysGrid}>
            {days.map((day) => (
              <Button
                key={day.unix()}
                asIcon
                type="button"
                variant={getDayButtonsVariant(day)}
                color={getDayButtonsColor(day)}
                className={cls({
                  [styles._notCurrentMonth ?? ""]:
                    day.month() !== currentDate.month(),
                })}
                onClick={() => selectDay(day)}
              >
                {day.date()}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
