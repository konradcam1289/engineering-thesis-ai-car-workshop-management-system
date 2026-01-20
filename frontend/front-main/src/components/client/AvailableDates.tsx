import React, { useEffect, useState } from 'react';
import appointmentService, { AvailableDate } from '../../services/appointmentService';

const AvailableDates: React.FC = () => {
    const [dates, setDates] = useState<AvailableDate[]>([]);

    useEffect(() => {
        appointmentService.getAvailableDates().then(setDates);
    }, []);

    return (
        <ul>
            {dates.map((date) => (
                <li key={date.id}>{date.dateTime} {date.reserved ? "(zajęty)" : "(wolny)"}</li>
            ))}
        </ul>
    );
};

export default AvailableDates;
