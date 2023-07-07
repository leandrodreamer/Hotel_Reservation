import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createHotelListFromJsonList, getHotelById, getHotelBySlug } from '../services/hotelsUtils'
import hotelsDataJson from '@/hotelsData.json'

export const useHotelsDataStore = defineStore('hotelsData', () => {
  
  const hotels = createHotelListFromJsonList(hotelsDataJson.hotels)


  function getHotelInStoreById(id) {
    return getHotelById(id, hotels);
  }

  function getHotelInStoreBySlug(slug) {
    return getHotelById(slug, hotels);
  }

  return { 
    hotels, 
    getHotelInStoreById, 
    getHotelInStoreBySlug
  }
})
