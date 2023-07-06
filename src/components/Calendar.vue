<template>
    <div>
        <div class="calendar">
            <div class="header">
                <button @click="prevMonth">&lt;</button>
                <h2>{{ month }}</h2>
                <button @click="nextMonth">&gt;</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(week, index) in calendar" :key="index">
                        <td v-for="day in week" :key="day.date" class="calendar-day" :tabindex="!isDisabled(day) ? '0' : '-1'"
                            :class="{ selected: isSelected(day), disabled: isDisabled(day), empty: (!day.date) }"
                            @click="selectDate(day)" @keydown.space.prevent="selectDate(day)">
                            <span v-if="day">{{ day.date }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            today: new Date(),
            selected: [],
            daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            month: '',
            monthOffset: 0,
            calendar: []
        };
    },
    created() {
        this.generateCalendar();
    },
    methods: {
        generateCalendar() {
            const year = this.today.getFullYear();
            const month = this.today.getMonth() + this.monthOffset;
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDay = new Date(year, month, 1).getDay();
            const lastDay = new Date(year, month, daysInMonth).getDay();
            const calendar = [];
            let week = [];

            for (let i = 0; i < firstDay; i++) {
                week.push({ date: null });
            }

            for (let day = 1; day <= daysInMonth; day++) {
                if (week.length === 7) {
                    calendar.push(week);
                    week = [];
                }
                week.push({ date: day, year, month });
            }

            for (let i = lastDay; i < 6; i++) {
                week.push({ date: null });
            }

            calendar.push(week);

            this.calendar = calendar;
            this.month = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
        },
        prevMonth() {
            this.monthOffset--
            this.generateCalendar();
        },
        nextMonth() {
            this.monthOffset++
            this.generateCalendar();
        },
        selectDate(day) {
            if (day && !this.isDisabled(day) && day.date) {
                const selectedDate = this.selected.find(date => date.year === day.year && date.month === day.month && date.date === day.date);
                if (selectedDate) {
                    this.selected = this.selected.filter(date => date !== selectedDate);
                } else {
                    this.selected.push(day);
                }
            }
            this.$emit('selected-updated', this.selectedDates);
        },
        isSelected(day) {
            return this.selected.some(date => date.year === day.year && date.month === day.month && date.date === day.date);
        },
        isDisabled(day) {
            const selectedDate = new Date(day.year, day.month, day.date);
            return selectedDate < this.yesterday || day.date === null;// || selectedDate.getMonth() > this.today.getMonth() + 1;
        },
        getWeekDay(day) {
            console.log(Date.getWeekDay(day))
            return true
        },
    },
    computed: {
        selectedDates() {
            return this.selected.map(date => new Date(date.year, date.month, date.date));
        },
        yesterday() {
            return (new Date().setDate(this.today.getDate() - 1));
        }
    }
};
</script>
  
<style lang="scss" scoped>
.calendar {
    max-width: 400px;
    margin: 0 auto;
    min-width: 320px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    table {
        width: 100%;
    }

    th,
    td {
        text-align: center;
        padding: 10px;
        cursor: pointer;
        border-radius: 30px;
    }

    th {
        padding: 5px;
    }

    td.selected {
        background-color: #d1ff7db4;
    }

    td.disabled {
        color: #ccc;
        cursor: not-allowed;
        background-color: #ff000021;
    }

    td.empty {
        opacity: 0;
        cursor: default;
    }
}
</style>
  