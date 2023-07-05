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
            :class="{ highlight: bookingCalculateStore.lowerPrice.hotel.id === hotel.id }" />
    </div>
</template>

<style>
.hotel-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: white;
    /*outline: 3px solid rgb(70, 86, 105);*/
    padding: 20px;
}

.highlight {
    outline: 10px solid gold !important;
    transform: scale(1.1);
}
</style>