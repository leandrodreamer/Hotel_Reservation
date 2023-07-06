<script setup>
import hotelCard from '../components/HotelCard.vue'
import { useHotelsDataStore } from '../stores/hotelsDataStore'
import { useBookingCalculateStore } from '../stores/bookingCalculateStore'

const hotelsDataStore = useHotelsDataStore()
const bookingCalculateStore = useBookingCalculateStore()
</script>

<template>
    <div class="hotel-list">
        <hotelCard v-for="hotel in hotelsDataStore.hotels" :key="hotel.id" :hotelId="hotel.id"
            :class="{ highlight: !bookingCalculateStore.isSelectedDatesEmpty && bookingCalculateStore.lowerPrice.hotel.id === hotel.id }" />
    </div>
</template>

<style lang="scss">
.hotel-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: var(--background-color);
    padding: 20px;
}

.hotel-card{
    transition: outline-color 0.3s, transform 0.3s, outline 0.3s;
}

.highlight {
    outline: 10px solid gold !important;
    transform: scale(1.1);
    transition: outline-color 0.3s, transform 0.3s, outline 0.3s;
}
</style>