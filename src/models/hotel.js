export default class Hotel {
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