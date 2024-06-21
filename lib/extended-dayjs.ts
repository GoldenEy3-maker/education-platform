import dayjs from "dayjs";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";
import durationPlugin from "dayjs/plugin/duration";

dayjs.locale("ru");
dayjs.extend(relativeTimePlugin);
dayjs.extend(durationPlugin);

export default dayjs;
