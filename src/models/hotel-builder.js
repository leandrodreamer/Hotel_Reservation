import Hotel from "./hotel"

export default class HotelBuilder {
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