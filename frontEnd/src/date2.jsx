function FormatDate2(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toISOString();
    const day = formattedDate.slice(8, 10);
    const month = formattedDate.slice(5, 7);
    return `${day}/${month}`;
}

export default FormatDate2;