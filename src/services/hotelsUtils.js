export class Price {
    constructor(regular, reward) {
        this.regular = regular;
        this.reward = reward;
    }
}

export class Hotel {
    constructor(name, slug, id, rating, priceWeekday, priceWeekend, image, description) {
        this.name = name;
        this.slug = slug;
        this.id = id;
        this.rating = rating;
        this.priceWeekday = priceWeekday;
        this.priceWeekend = priceWeekend;
        this.image = image;
        this.description = description;
    }
}

export class HotelBuilder {
    constructor() {
        this.name = '';
        this.slug = '';
        this.id = 0;
        this.rating = 0;
        this.priceWeekday = null;
        this.priceWeekend = null;
        this.image = '';
        this.description = '';
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setSlug(slug) {
        this.slug = slug;
        return this;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setRating(rating) {
        this.rating = rating;
        return this;
    }

    setPriceWeekday(priceWeekday) {
        this.priceWeekday = priceWeekday;
        return this;
    }

    setPriceWeekend(priceWeekend) {
        this.priceWeekend = priceWeekend;
        return this;
    }

    setImage(image) {
        this.image = image;
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }

    build() {
        return new Hotel(
            this.name,
            this.slug,
            this.id,
            this.rating,
            this.priceWeekday,
            this.priceWeekend,
            this.image,
            this.description
        );
    }
}

export const createPriceFromObject = (object) => {
    const { regular, reward } = object;
    return new Price(regular, reward);
}

export const createHotelFromObject = (object) => {
    const priceWeekday = createPriceFromObject(object.prices.weekday);
    const priceWeekend = createPriceFromObject(object.prices.weekend);
    
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