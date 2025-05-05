

export function getFirstAndLastDayOfMonth() {
    // Get current date
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
  
    // First day of the month
    const firstDay = new Date(year, month, 1);
  
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
  
    // Formatting helper function
    function formatDate(date: Date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
  
    // Return formatted first and last day
    return {
      firstDay: formatDate(firstDay),
      lastDay: formatDate(lastDay),
    };
  }
  