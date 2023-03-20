function FormatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toISOString();
    const day = formattedDate.slice(8, 10);
    const month = formattedDate.slice(5, 7);
    const year = formattedDate.slice(0, 4);
    const hour = formattedDate.slice(11, 13);
    return ` ${hour}h - ${day}/${month} `;
}

export default FormatDate;