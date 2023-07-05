<template>
    <div class="hotel-card" :style="{ 'background-image': `url(${hotel.image})` }" v-if="hotel">
        <div class="bg-overlay"></div>
        <h2 class="content">{{ hotel.name }}</h2>
        <div class="stars content">
            <span class="star" v-for="n in hotel.rating" :key="n">&#9733;</span>
        </div>
        <div class="prices content">
            <div class="price">
                <h4>Weekday:</h4>
                <p>${{ hotel.prices.weekday.regular }}</p>
                <h4>Reward:</h4>
                <p>${{ hotel.prices.weekday.reward }}</p>
            </div>
            <div class="price">
                <h4>Weekend:</h4>
                <p>${{ hotel.prices.weekend.regular }}</p>
                <h4>Reward:</h4>
                <p>${{ hotel.prices.weekend.reward }}</p>
            </div>
        </div>
    </div>
    <div v-else>
        <p>No hotel found.</p>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import { useHotelsDataStore } from '../stores/hotelsDataStore';

export default defineComponent({
    props: {
        hotelId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const hotelsDataStore = useHotelsDataStore();

        return {
            hotelsDataStore
        };
    },

    computed: {
        hotel() {
            return this.hotelsDataStore.getHotelById(this.hotelId);
        }
    }
});
</script>
  
<style scoped>
.hotel-card {
    position: relative;
    background-color: #b6f7ff;
    background-size: cover;
    overflow: hidden;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7);
    max-width: 300px;
    min-width: 250px;
    margin: 20px;
    outline: 3px solid rgb(70, 86, 105)
}

.bg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 70%;
    z-index: 1;
}

.content {
    position: relative;
    z-index: 2;
}

.stars {
    margin-bottom: 10px;
    background-color: #000000b0;
    padding: 0 6px;
    width: fit-content;
    border-radius: 20px;
}

.star {
    color: gold;

}

.prices {
    display: flex;
    flex-wrap: wrap;
}

.price {
    flex: 1 1 50%;
    padding: 10px;
}

h4 {
    margin: 0;
}

p {
    margin: 0;
    font-weight: bold;
}
</style>
  