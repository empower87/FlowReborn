type TimeFrameObj = {
  m: "h" | "d" | "w" | "m" | "y"
  mm: "hr" | "day" | "wk" | "mo" | "yr"
  mmAgo: "sec ago" | "min ago" | "hr ago" | "day ago" | "wk ago" | "mo ago" | "yr ago"
  mmmmAgo: "second ago" | "minute ago" | "hour ago" | "day ago" | "week ago" | "month ago" | "years ago"
}

enum TimeInMsEnum {
  Year = 31536000000,
  Month = 2592000000,
  Week = 604800000,
  Day = 86400000,
  Hour = 3600000,
  Minute = 60000,
  Second = 1000,
}

enum CalendarEnum {
  January = "01",
  February = "02",
  March = "03",
  April = "04",
  May = "05",
  June = "06",
  July = "07",
  August = "08",
  September = "09",
  October = "10",
  November = "11",
  December = "12",
}

type FormatType = "MMMM_Dth_YYYY" | "MMMM_D_YYYY" | "m" | "mm" | "mmAgo" | "mmmmAgo"

export default function useFormatDate() {
  const formatDate = (date: Date | undefined, formatType: FormatType) => {
    if (date == null || formatType == null) return
    else if (formatType === "MMMM_Dth_YYYY" || formatType === "MMMM_D_YYYY")
      return formatMonthDYear(date.toString(), formatType)
    else {
      const formattedDate = handleDateString(date)
      return formattedDate[formatType]
    }
  }

  const formatMonthDYear = (date: string, string: string) => {
    const [year, month, day] = date.slice(0, 10).split("-")

    const indexofMonth = Object.values(CalendarEnum).indexOf(month as unknown as CalendarEnum)
    const monthName = Object.keys(CalendarEnum)[indexofMonth]

    if (string.indexOf("t") > 0) return `${monthName} ${day}th ${year}`
    else return `${monthName} ${day}, ${year}`
  }

  return { formatDate }
}

const getDateDifferenceInMs = (date: Date): number => {
  const dateNow = Date.now()
  const dateThen = Date.parse(date.toString())
  return dateNow - dateThen
}

const getFormattedObject = (timeDifference: number, timeUnitInMs: number, timeUnit: string) => {
  let timeValue = Math.round(timeDifference / timeUnitInMs)
  const isPlural = timeValue === 1 ? "" : "s"
  const units = timeUnit.split("-")
  const formattedObject = {
    m: `${timeValue}${units[0]}`,
    mm: `${timeValue}${units[1]}`,
    mmAgo: `${timeValue} ${units[1]}${isPlural} ago`,
    mmmmAgo: `${timeValue} ${units[2]}${isPlural} ago`,
  }
  return formattedObject
}

const handleDateString = (date: Date) => {
  const timeDiff = getDateDifferenceInMs(date)

  switch (timeDiff < TimeInMsEnum.Year) {
    case timeDiff >= TimeInMsEnum.Month:
      return getFormattedObject(timeDiff, TimeInMsEnum.Month, "m-mo-month")
    case timeDiff >= TimeInMsEnum.Week:
      return getFormattedObject(timeDiff, TimeInMsEnum.Week, "w-wk-week")
    case timeDiff >= TimeInMsEnum.Day:
      return getFormattedObject(timeDiff, TimeInMsEnum.Day, "d-day-day")
    case timeDiff >= TimeInMsEnum.Hour:
      return getFormattedObject(timeDiff, TimeInMsEnum.Hour, "h-hr-hour")
    case timeDiff >= TimeInMsEnum.Minute:
      return getFormattedObject(timeDiff, TimeInMsEnum.Minute, "min-min-minute")
    case timeDiff >= TimeInMsEnum.Second:
      return getFormattedObject(timeDiff, TimeInMsEnum.Second, "s-sec-seconds")
    default:
      return getFormattedObject(timeDiff, TimeInMsEnum.Year, "y-yr-year")
  }
}
