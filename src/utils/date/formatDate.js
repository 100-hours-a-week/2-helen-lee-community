function formatDate(isoString) {
    const date = new Date(isoString);
    
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0-based
    const day = date.getDate();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
}

export default formatDate;
