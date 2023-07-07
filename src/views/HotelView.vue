<template>
    <div>
        <div class="hotel-header">
            <img :src="'/' + hotel.image" alt="" class="hotel-image">
        </div>
        <div class="container">
            <div class="title">
                <h1>{{ hotel.name }}</h1>
            </div>
            <StarsRating :stars="hotel.rating" />
            <div class="prices">
                <div class="price">
                    <h4>Normal: </h4>
                    <p>Weekday: ${{ hotel.priceWeekday.regular }}</p>
                    <p>Weekend: ${{ hotel.priceWeekend.regular }}</p>
                </div>
                <div class="price">
                    <h4>Reward:</h4>
                    <p>Weekday: ${{ hotel.priceWeekday.reward }}</p>
                    <p>Weekend: ${{ hotel.priceWeekend.reward }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useHotelsDataStore } from '../stores/hotelsDataStore';
import { useRoute } from 'vue-router';
import StarsRating from '@/components/StarsRating.vue';

const hotelsDataStore = useHotelsDataStore();
const route = useRoute();

const hotel = hotelsDataStore.getHotelInStoreById(parseInt(route.params.id));
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    margin: 0 10%;
    padding-bottom: 50px;
}

.hotel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    margin: auto;
    max-width: 100%;
    max-height: 400px;
}

.hotel-image {
    margin: auto;
}

.title {
    display: flex;
}

.prices {
    display: flex;
    flex-wrap: wrap;

    .price {
        flex: 1 1 50%;
        padding: 10px;
        font-size: large;

        h4 {
            margin: 0;
        }

        p {
            margin: 0;
            font-weight: bold;
        }
    }
}
</style>