<template>
    <div class="filter-fields-holder">
        <div class="filter-fields">
            <div class="filter-column">
                <div class="checkbox">
                    <input class="checkbox-input" type="checkbox" name="reward" value="is-reward"
                        v-model="bookingCalculateStore.isReward">
                    <label class="checkbox-label" for="reward"> I am in the loyalty program</label>
                </div>
                <p class="message" v-if="bookingCalculateStore.isSelectedDatesEmpty()">
                    Please<br />select the day or days<br />you are planning to book in
                </p>
                <p class="message" v-else>
                    Best price: {{ bookingCalculateStore.lowerPrice.hotel.name }}<br />Total value: ${{
                        bookingCalculateStore.lowerPrice.totalPrice }}
                </p>
            </div>
            <Calendar class="filter-column" @selected-updated="calendarSelectedUpdated" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Calendar from '../components/Calendar.vue'
import { useBookingCalculateStore } from '../stores/bookingCalculateStore'

const bookingCalculateStore = useBookingCalculateStore()

function calendarSelectedUpdated(selection) {
    bookingCalculateStore.selectedDates = selection
}
</script>

<style>
.filter-fields-holder {
    display: flex;
    justify-content: center;
    background-image: url("images/hotel.jpeg");
    background-size: cover;
}

.filter-fields {
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    margin: 20px;
    padding: 20px;
    border-radius: 20px;
    outline: 3px solid rgb(70, 86, 105);
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
}

.checkbox-input:checked {
    border-color: #6c63ff;
    background-color: #6c63ff;
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
    /*justify-content: center;*/
    gap: 30%;
    padding: 10px 0;
}
</style>