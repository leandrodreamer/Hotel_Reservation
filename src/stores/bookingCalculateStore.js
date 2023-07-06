import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useHotelsDataStore } from '../stores/hotelsDataStore'

export const useBookingCalculateStore = defineStore('bookingCalculate', () => {
    const hotelsDataStore = useHotelsDataStore()
    const selectedDates = ref([])
    const isReward = ref(false)

    const isSelectedDatesEmpty = computed(function () {
        return selectedDates.value.length === 0;
    })

    function isWeekend(date) {
        const dayOfWeek = date.getDay();
        return (dayOfWeek === 0 || dayOfWeek === 6)
    }

    function calculatePriceOfHotel(hotel) {
        if (!hotel) {
            return 0;
        }

        const totalPrice = selectedDates.value.reduce((total, date) => {
            const priceString = isWeekend(date) ? "priceWeekend" : "priceWeekday";
            const price = isReward.value ? hotel[priceString].reward : hotel[priceString].regular;
            return total + price;
        }, 0);

        return totalPrice;
    }

    function getCheaper(hotelList){
        const cheapest = hotelList.reduce((cheapest, hotel) => {
            const totalPrice = calculatePriceOfHotel(hotel);

            if (!cheapest || totalPrice < cheapest.totalPrice || (totalPrice === cheapest.totalPrice && hotel.rating > cheapest.hotel.rating)) {
                return { hotel, totalPrice };
            }

            return cheapest;
        }, null);

        return cheapest;
    }

    const lowerPrice = computed(function () { return getCheaper(hotelsDataStore.hotels); });

    return {
        selectedDates,
        isReward,
        isSelectedDatesEmpty,
        lowerPrice,
        calculatePriceOfHotel,
        getCheaper
    }
})
