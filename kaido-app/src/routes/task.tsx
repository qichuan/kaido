import { h, Fragment } from "preact"
import { useRef, useContext, useEffect, useState } from "preact/hooks"
import { Container, Box, Text } from "theme-ui"
import moment from "moment"

import { usePopup, useSoftkey, useNavigation } from "../hooks"
import { GraphContext } from "../contexts"
import Item from "../components/item"
import Menu from "../components/menu"
import Loading from "../components/loading"
import ItemSub from "../components/itemSub"
import { IconReminder, IconDueDate, IconRepeat } from "../components/icons"
import Separator from "../components/separator"

// call this function, passing-in your date
const dateToFromNowDaily = (myDate: string) => {
  // get from-now for this date
  const fromNow = moment(myDate).fromNow()

  // ensure the date is displayed with today and yesterday
  return moment(myDate).calendar(undefined, {
    // when the date is closer, specify custom values
    lastWeek: `[Last] dddd`,
    lastDay: `[Yesterday]`,
    sameDay: `[Today]`,
    nextDay: `[Tomorrow]`,
    nextWeek: `dddd`,
    // when the date is further away, use from-now functionality
    sameElse: () => `[${fromNow}]`,
  })
}

const TaskDetails = ({ task }: any) => {
  const {
    subject,
    importance,
    status,
    dueDateTime,
    isReminderOn,
    reminderDateTime,
    recurrence,
    createdDateTime,
    body,
  } = task

  const dueDate = dueDateTime ? `Due ${dateToFromNowDaily(dueDateTime.dateTime)}` : `Due date`
  const reminder = reminderDateTime ? `Remind me at ${dateToFromNowDaily(reminderDateTime.dateTime)}` : `Remind me`
  const createdOn = `Created ${dateToFromNowDaily(createdDateTime)}`

  return (
    <Fragment>
      <Item checkbox="star" checked={importance === `high`} text={subject} strike={status === `completed`} />
      <Separator text="Details" />
      <ItemSub text={reminder}>
        <IconReminder />
      </ItemSub>
      <ItemSub text={dueDate}>
        <IconDueDate />
      </ItemSub>
      <ItemSub text="Repeat">
        <IconRepeat />
      </ItemSub>
      <Box data-nav-selectable data-nav-selected-key="taskContent" sx={{ p: 3 }}>
        <Text as="p" variant="kaiui.p.sec">
          {body.content !== `` ? body.content : `Add note here...`}
        </Text>
      </Box>
      <Box sx={{ p: 3, pb: 4, textAlign: `center` }}>
        <Text as="p">{createdOn}</Text>
      </Box>
    </Fragment>
  )
}

type TaskProps = {
  taskId: string
}

const Task = ({ taskId }: TaskProps) => {
  const containerRef = useRef<HTMLDivElement>(null!)
  const menuRef = useRef<HTMLDivElement>(null!)
  const [showMenu] = usePopup(Menu)
  const { graph } = useContext(GraphContext)

  const [task, setTask] = useState<any>(null)
  const [setNavigation, getCurrent, current] = useNavigation(`Task`, containerRef, `y`)

  const onDeleteTask = async () => {
    await graph.deleteTaskAsync(taskId)
    window.history.back()
  }

  const menus = [{ text: `Delete task`, key: `delete-task`, action: onDeleteTask }]

  useSoftkey(`Task`, {
    center: `Select`,
    onKeyCenter: () => undefined,
    right: `Options`,
    onKeyRight: () => showMenu({ menus, containerRef: menuRef }),
    onKeyBackspace: () => window.history.back(),
  })

  useEffect(() => {
    ;(async (): Promise<void> => {
      const taskResponse = await graph.getTaskAsync(taskId)
      setTask(taskResponse)
    })()
  }, [])

  useEffect(() => setNavigation(0), [task])

  return task ? (
    <Container ref={containerRef} variant="kaiui.list">
      <TaskDetails task={task} />
    </Container>
  ) : (
    <Loading />
  )
}

export default Task
