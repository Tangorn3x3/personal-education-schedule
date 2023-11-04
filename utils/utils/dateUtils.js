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
    const today = new Date();
    let daysUntilMonday = 1 - today.getDay(); // Вычисляем дни до следующего понедельника, учитывая воскресенье
    if (daysUntilMonday <= 0) {
        daysUntilMonday += 7; // Если сегодня воскресенье, добавляем 7 дней
    }
    const nextWeekStartDate = new Date(today);
    nextWeekStartDate.setDate(today.getDate() + daysUntilMonday);

    const year = nextWeekStartDate.getFullYear();
    const month = String(nextWeekStartDate.getMonth() + 1).padStart(2, '0');
    const day = String(nextWeekStartDate.getDate()).padStart(2, '0');
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