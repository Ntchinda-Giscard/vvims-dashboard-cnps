export const convertToEventArray = (data: any) => {
    return data?.events.map((event: { start_date: any; start_time: any; end_time: any; title: any; }, index: any) => {
        const start = `${event?.start_date} ${ event?.start_time === event?.end_time ? null : event?.start_time.slice(0,5)}`;
        const end = `${event?.start_date} ${ event?.start_time === event?.end_time ? null : event?.end_time.slice(0,5)}`;
        return {
            id: (index + 1).toString(), // Generating sequential IDs
            title: event.title,
            start,
            end,
        };
    });
};