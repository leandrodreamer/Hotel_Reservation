import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useHotelsDataStore } from '../stores/hotelsDataStore'

export const useBookingCalculateStore = defineStore('booking-calculate', () => {
    const hotelsDataStore = useHotelsDataStore()
    const selectedDates = ref([])
    const isReward = ref(false)

    function isSelectedDatesEmpty() {
        return selectedDates.value.length === 0;
    }

    const lowerPrice = computed(function () {
        if (isSelectedDatesEmpty()) {
            return { hotel: { id: -1 }, totalPrice: 0 }
        }
        const lowerPrice = hotelsDataStore.hotels.reduce((cheapest, hotel) => {
            const totalPrice = selectedDates.value.reduce((total, date) => {
                const dayOfWeek = date.getDay();
                const dayString = (dayOfWeek === 0 || dayOfWeek === 6) ? "weekend" : "weekday"
                const price = isReward.value ? hotel.prices[dayString].reward : hotel.prices[dayString].regular;
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
