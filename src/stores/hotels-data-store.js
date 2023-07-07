import { defineStore } from 'pinia'
import { createHotelListFromJsonList, getHotelById, getHotelBySlug } from '../services/hotels-service'
import hotelsDataJson from '@/hotelsData.json'

export const useHotelsDataStore = defineStore('hotelsData', () => {
  
  const hotels = createHotelListFromJsonList(hotelsDataJson.hotels)


  function getHotelInStoreById(id) {
    return getHotelById(id, hotels);
  }

  function getHotelInStoreBySlug(slug) {
    return getHotelBySlug(slug, hotels);
  }

  return { 
    hotels, 
    getHotelInStoreById, 
    getHotelInStoreBySlug
  }
})
