export function getStartOfWeekFormatted() {
    const now = new Date();
    const currentDay = now.getDay();
    const diff = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // 1 for Monday, 0 for Sunday
    const startOfWeek = new Date(now.setDate(diff));

    const year = startOfWeek.getFullYear();
    const month = (startOfWeek.getMonth() + 1).toString().padStart(2, '0');
    const day = startOfWeek.getDate().toString().padStart(2, '0');

    return `${year}${month}${day}`;
}

export function getStartOfNextWeekFormatted() {
    const now = new Date();
    const currentDay = now.getDay();
    const diff = currentDay === 0 ? 7 : 7 - currentDay;
    const startOfNextWeek = new Date(now.setDate(now.getDate() + diff));

    const year = startOfNextWeek.getFullYear();
    const month = (startOfNextWeek.getMonth() + 1).toString().padStart(2, '0');
    const day = startOfNextWeek.getDate().toString().padStart(2, '0');

    return `${year}${month}${day}`;
}

export function filterArrayByDateField(array, fieldName, filterDate) {
    return array.filter((item) => {
        const itemDate = new Date(item[fieldName]);
        return itemDate.getFullYear() === filterDate.getFullYear() &&
            itemDate.getMonth() === filterDate.getMonth() &&
            itemDate.getDate() === filterDate.getDate();
    });
}