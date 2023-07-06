import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useHotelsDataStore } from '../stores/hotelsDataStore'

export const useBookingCalculateStore = defineStore('booking-calculate', () => {
    const hotelsDataStore = useHotelsDataStore()
    const selectedDates = ref([])
    const isReward = ref(false)

    const isSelectedDatesEmpty = computed(function () {
        return selectedDates.value.length === 0;
    })

    const lowerPrice = computed(function () {
        const lowerPrice = hotelsDataStore.hotels.reduce((cheapest, hotel) => {
            const totalPrice = selectedDates.value.reduce((total, date) => {
                const dayOfWeek = date.getDay();
                const priceString = (dayOfWeek === 0 || dayOfWeek === 6) ? "priceWeekend" : "priceWeekday"
                const price = isReward.value ? hotel[priceString].reward : hotel[priceString].regular;
                return total + price;
            }, 0);

            if (!cheapest || totalPrice < cheapest.totalPrice || (totalPrice === cheapest.totalPrice && hotel.rating > cheapest.hotel.rating)) {
                return { hotel, totalPrice };
            }

            return cheapest;
        }, null);
        return lowerPrice
    })

    return {
        selectedDates,
        isReward,
        isSelectedDatesEmpty,
        lowerPrice
    }
})
