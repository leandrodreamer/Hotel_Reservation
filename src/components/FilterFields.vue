<template>
    <div class="filter-fields-holder">
        <div class="filter-fields">
            <div class="filter-column">
                <div class="checkbox">
                    <input class="checkbox-input" type="checkbox" id="reward" name="reward" value="is-reward"
                        tabindex="0" v-model="bookingStore.isReward">
                    <label class="checkbox-label" for="reward"> I am in the loyalty program</label>
                </div>
                <p class="message" v-if="bookingStore.isSelectedDatesEmpty">
                    Please<br />select the day or days<br />you are planning to book in
                </p>
                <p class="message" v-else>
                    Best price: {{ bookingStore.cheapest.hotel.name }}<br />Total value: ${{
                        bookingStore.cheapest.totalPrice }}
                </p>
            </div>
            <Calendar :propSelected="bookingStore.selectedDates" class="filter-column" @selected-updated="calendarSelectedUpdated" />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Calendar from '../components/Calendar.vue'
import { useBookingStore } from '../stores/bookingStore'

const bookingStore = useBookingStore()

function calendarSelectedUpdated(selection) {
    bookingStore.selectedDates = selection
}
Calendar.selected = bookingStore.selectedDates
onMounted(() => {
    Calendar.selected = bookingStore.selectedDates
})
</script>

<style lang="scss">
.filter-fields-holder {
    display: flex;
    justify-content: center;
    background-image: url("/images/hotel.jpg");
    background-size: cover;
}

.filter-fields {
    display: flex;
    flex-wrap: wrap;
    background-color: var(--background-color);
    margin: 20px;
    padding: 20px;
    border-radius: 20px;
    outline: 3px solid var(--primary-color);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7);
}

.filter-fields .filter-column {
    margin: 10px 20px;
}

.checkbox {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 20px;
    border-radius: 4px;
    &:focus-within {
        outline: 2px solid black;
    }
}

.message {
    margin-bottom: 20px;
}

.checkbox-input {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    margin-right: 10px;
    transition: border-color 0.3s ease;

    &:checked {
        border-color: var(--primary-color);
        background-color: var(--primary-color);
    }
}

.checkbox-label {
    font-size: 14px;
    color: #333;
    cursor: pointer;
}

.filter-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30%;
    padding: 10px 0;
}
</style>../stores/bookingStore