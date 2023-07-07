import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useHotelsDataStore } from './hotelsDataStore'
import { getCheapest, calculatePriceOfHotel } from "../services/bookingUtils"

export const useBookingStore = defineStore('booking', () => {
    const hotelsDataStore = useHotelsDataStore()
    const selectedDates = ref([])
    const isReward = ref(false)

    const isSelectedDatesEmpty = computed(function () {
        return selectedDates.value.length === 0;
    })

    const cheapest = computed(function () { 
        return getCheapest(hotelsDataStore.hotels, selectedDates.value, isReward.value); 
    });

    return {
        selectedDates,
        isReward,
        isSelectedDatesEmpty,
        cheapest,
        calculatePriceOfHotel,
        getCheapest
    }
})
