<template>
    <div class="hotel-card" :style="{ 'background-image': `url(${hotel.image})` }" v-if="hotel">
        <div class="bg-overlay"></div>
        <div class="title content">
            <h2>{{ hotel.name }}</h2>
            <p v-if="!bookingCalculateStore.isSelectedDatesEmpty">(${{ bookingCalculateStore.calculatePriceOfHotel(hotel)
            }})</p>
        </div>
        <div class="stars content">
            <span class="star" v-for="n in hotel.rating" :key="n">&#9733;</span>
        </div>
        <div class="prices content">
            <div class="price">
                <h4>Weekday:</h4>
                <p>${{ hotel.priceWeekday.regular }}</p>
                <h4>Reward:</h4>
                <p>${{ hotel.priceWeekday.reward }}</p>
            </div>
            <div class="price">
                <h4>Weekend:</h4>
                <p>${{ hotel.priceWeekend.regular }}</p>
                <h4>Reward:</h4>
                <p>${{ hotel.priceWeekend.reward }}</p>
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
import { useBookingCalculateStore } from '../stores/bookingCalculateStore';

export default defineComponent({
    props: {
        hotelId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const hotelsDataStore = useHotelsDataStore();
        const bookingCalculateStore = useBookingCalculateStore();

        return {
            hotelsDataStore,
            bookingCalculateStore
        };
    },

    computed: {
        hotel() {
            return this.hotelsDataStore.getHotelById(this.hotelId);
        }
    }
});
</script>
  
<style lang="scss" scoped>
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
    outline: 3px solid var(--primary-color);

    .bg-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        opacity: 0.8;
        z-index: 1;
    }

    .title {
        display: flex;

        p {
            opacity: 40%;
            margin-left: 10px;
        }
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

        .star {
            color: gold;
        }
    }

    .prices {
        display: flex;
        flex-wrap: wrap;

        .price {
            flex: 1 1 50%;
            padding: 10px;

            h4 {
                margin: 0;
            }

            p {
                margin: 0;
                font-weight: bold;
            }
        }
    }
}
</style>
  