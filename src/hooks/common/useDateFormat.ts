import useCurrentLocale from "./useCurrentLocale";

export const useDateFormat = () => {
  const { currentLocale } = useCurrentLocale();

  const formatDateTime = (date: string | Date): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat(currentLocale, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(dateObj);
  };

  const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat(currentLocale, {
      dateStyle: "medium",
    }).format(dateObj);
  };

  const formatTime = (date: string | Date): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat(currentLocale, {
      timeStyle: "short",
    }).format(dateObj);
  };

  const formatLongDateTime = (date: string | Date): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat(currentLocale, {
      dateStyle: "long",
      timeStyle: "medium",
    }).format(dateObj);
  };

  const formatDayAndTime = (date: string | Date): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat(currentLocale, {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
    }).format(dateObj);
  };

  const formatDayName = (date: string | Date): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat(currentLocale, {
      weekday: "long",
    }).format(dateObj);
  };

  const formatRelative = (date: string | Date): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor(
      (dateObj.getTime() - now.getTime()) / 1000,
    );

    if (diffInSeconds < 60) {
      return `in ${diffInSeconds}s`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `in ${diffInMinutes}m`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `in ${diffInHours}h`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `in ${diffInDays}d`;
  };

  return {
    formatDateTime,
    formatDate,
    formatTime,
    formatLongDateTime,
    formatDayAndTime,
    formatDayName,
    formatRelative,
  };
};
