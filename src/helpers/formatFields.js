import { useMemo } from "react";

export const formatDate = (largeDate) => {
    return largeDate.length > 17 
        && largeDate.substring(0,17)
}

export const formatHour = (largeDate) => {
    return largeDate.length > 17 
        && largeDate.substring(17,22)
}

export const formatBody = (body) => {
    return body.length > 45 
        ? body.substring(0,45) + '...'
        : body;
}