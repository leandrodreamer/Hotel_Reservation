import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import hotelsDataJson from '@/hotelsData.json'

export const useHotelsDataStore = defineStore('hotelsData', () => {
  const hotels = hotelsDataJson.hotels

  function getHotelById(id) {
    return hotels.find(hotel => hotel.id === id);
  }

  function getHotelBySlug(slug) {
    return hotels.find(hotel => hotel.slug === slug);
  }

  return { getHotelById, getHotelBySlug, hotels }
})
