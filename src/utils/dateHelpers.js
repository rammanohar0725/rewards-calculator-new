
export function getMonthName(dateStr) {
    const date = new Date(dateStr);
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getMonth()];
}

export function getYear(dateStr) {
    const date = new Date(dateStr);
    return date.getFullYear();
  }