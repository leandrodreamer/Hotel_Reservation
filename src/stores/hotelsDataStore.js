import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import hotelsDataJson from '@/hotelsData.json'

export const useHotelsDataStore = defineStore('hotelsData', () => {
  class Price {
    constructor(regular, reward) {
      this.regular = regular;
      this.reward = reward;
    }
  }

  function createPriceFromObject(object) {
    const { regular, reward } = object;
    return new Price(regular, reward);
  }
  class Hotel {
    constructor(name, slug, id, rating, priceWeekday, priceWeekend, image) {
      this.name = name;
      this.slug = slug;
      this.id = id;
      this.rating = rating;
      this.priceWeekday = priceWeekday;
      this.priceWeekend = priceWeekend;
      this.image = image;
    }
  }

  function createHotelFromObject(object) {
    const priceWeekday = createPriceFromObject(object.prices.weekday)
    const priceWeekend = createPriceFromObject(object.prices.weekend)
    const { name, slug, id, rating, image } = object;
    return new Hotel(name, slug, id, rating, priceWeekday, priceWeekend, image);
  }

  function loadHotelsFromJsonList(jsonList) {
    const hotels = [];
    for (const object of jsonList) {
      const hotel = createHotelFromObject(object);
      hotels.push(hotel);
    }
    return hotels;
  }
  
  const hotels = loadHotelsFromJsonList(hotelsDataJson.hotels)

  function getHotelById(id) {
    return hotels.find(hotel => hotel.id === id);
  }

  function getHotelBySlug(slug) {
    return hotels.find(hotel => hotel.slug === slug);
  }

  return { getHotelById, getHotelBySlug, hotels }
})
