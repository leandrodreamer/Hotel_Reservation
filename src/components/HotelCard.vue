<template>
    <RouterLink :to="`/hotel/${hotel.id}/${hotel.slug}`" class="hotel-card" :style="{ 'background-image': `url(${hotel.image})` }"
        v-if="hotel">
        <div class="bg-overlay"></div>
        <div class="title content">
            <h2>{{ hotel.name }}</h2>
            <p v-if="!bookingStore.isSelectedDatesEmpty">(${{ 
                bookingStore.calculatePriceOfHotel(hotel, bookingStore.selectedDates, bookingStore.isReward) 
                }})</p>
        </div>
        <StarsRating class="content" :stars="hotel.rating" />
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
    </RouterLink>
    <div v-else>
        <p>No hotel found.</p>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { useHotelsDataStore } from '../stores/hotelsDataStore';
import { useBookingStore } from '../stores/bookingStore';
import StarsRating from '@/components/StarsRating.vue';

export default defineComponent({
    props: {
        hotelId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const hotelsDataStore = useHotelsDataStore();
        const bookingStore = useBookingStore();

        return {
            hotelsDataStore,
            bookingStore
        };
    },

    computed: {
        hotel() {
            return this.hotelsDataStore.getHotelInStoreById(this.hotelId);
        }
    },
    components: {
        StarsRating
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
  ../stores/bookingStore