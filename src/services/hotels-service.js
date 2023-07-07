import Price from "../models/price"
import HotelBuilder from "../models/hotel-builder"


export const createHotelFromObject = (object) => {
    const priceWeekday = new Price(
        object.prices.weekday.regular,
        object.prices.weekday.reward
    );
    const priceWeekend = new Price(
        object.prices.weekend.regular,
        object.prices.weekend.reward
    );

    return new HotelBuilder()
        .setName(object.name)
        .setSlug(object.slug)
        .setId(object.id)
        .setRating(object.rating)
        .setPriceWeekday(priceWeekday)
        .setPriceWeekend(priceWeekend)
        .setImage(object.image)
        .setDescription(object.description)
        .build();
}

export const createHotelListFromJsonList = (jsonList) => {
    const hotels = [];
    for (const object of jsonList) {
        const hotel = createHotelFromObject(object);
        hotels.push(hotel);
    }
    return hotels;
}

export const getHotelById = (id, hotelsList) => {
    return hotelsList.find(hotel => hotel.id === id);
}

export const getHotelBySlug = (slug, hotelsList) => {
    return hotelsList.find(hotel => hotel.slug === slug);
}

export { HotelBuilder, Price };