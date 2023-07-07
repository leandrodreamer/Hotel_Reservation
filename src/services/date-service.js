
export const isWeekend = (date) => {
    const SUNDAY = 0
    const SATURDAY = 6
    const dayOfWeek = date.getDay();
    return (dayOfWeek === SUNDAY || dayOfWeek === SATURDAY)
};


export const compareDates = (dateA, dateB) => {
    return dateA.getDate() === dateB.getDate() && dateA.getMonth() === dateB.getMonth() && dateA.getFullYear() === dateB.getFullYear();
};