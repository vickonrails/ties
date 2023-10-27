const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const month = months[date.getMonth()] as string;
    return `${date.getDate()} ${month}, ${date.getFullYear()}`;
}