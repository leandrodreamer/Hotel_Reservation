
import { isWeekend } from "./date-service"

export const calculatePriceOfHotel = (hotel, dates, isReward) => {
    if (!hotel) {
        return 0;
    }

    const totalPrice = dates.reduce((total, date) => {
        const priceString = isWeekend(date) ? "priceWeekend" : "priceWeekday";
        const price = isReward ? hotel[priceString].reward : hotel[priceString].regular;
        return total + price;
    }, 0);

    return totalPrice;
}

export const getCheapest = (hotelList, dates, isReward) => {
    const cheapest = hotelList.reduce((cheapest, hotel) => {
        const totalPrice = calculatePriceOfHotel(hotel, dates, isReward);

        if (!cheapest || totalPrice < cheapest.totalPrice || (totalPrice === cheapest.totalPrice && hotel.rating > cheapest.hotel.rating)) {
            return { hotel, totalPrice };
        }

        return cheapest;
    }, null);

    return cheapest;
}