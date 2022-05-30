
import {day, hour, minute, month, second, week, year} from "./goodtimes.js"

export function howLongAgo(timestamp: number) {
	const elapsed = Date.now() - timestamp
	return elapsed >= second
		? `${chooseUnitOfTimeToDisplay(elapsed)} ago`
		: null
}

function chooseUnitOfTimeToDisplay(elapsed: number) {
	if (elapsed < minute)
		return formatTimeForDisplay(elapsed, second, "second")

	else if (elapsed < hour)
		return formatTimeForDisplay(elapsed, minute, "minute")

	else if (elapsed < day)
		return formatTimeForDisplay(elapsed, hour, "hour")

	else if (elapsed < week)
		return formatTimeForDisplay(elapsed, day, "day")

	else if (elapsed < month)
		return formatTimeForDisplay(elapsed, week, "week")

	else if (elapsed < year)
		return formatTimeForDisplay(elapsed, month, "month")

	else
		return formatTimeForDisplay(elapsed, year, "year")
}

function formatTimeForDisplay(elapsed: number, unit: number, unitName: string) {
	const value = Math.round(elapsed / unit)
	return `${value} ${unitName}${value > 1 ?"s" :""}`
}
