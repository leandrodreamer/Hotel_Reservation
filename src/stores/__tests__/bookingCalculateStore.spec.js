import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBookingCalculateStore } from '@/stores/bookingCalculateStore'

describe('Booking calculation store Test', () => {
    let store = null

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useBookingCalculateStore()
    })

    it('initializes with zero selected dates', () => {
        expect(store.isSelectedDatesEmpty).toBeTruthy()
    })

    it('test adding a date', () => {
        store.selectedDates = [new Date(2023, 6, 8)]
        expect(store.isSelectedDatesEmpty).toBeFalsy()
        expect(store.lowerPrice.hotel.id).toEqual(2)
    })

    it('test calculating best booking option', () => {
        store.selectedDates = [new Date(2009, 3, 16), new Date(2009, 3, 17), new Date(2009, 3, 18)]
        expect(store.isSelectedDatesEmpty).toBeFalsy()
        expect(store.selectedDates.length === 3).toBeTruthy()
        expect(store.lowerPrice.hotel.id).toEqual(1)
    })

    it('test calculating best booking option with rewards and a value tie', () => {
        store.isReward = true
        store.selectedDates = [new Date(2009, 3, 26), new Date(2009, 3, 27), new Date(2009, 3, 28)]
        expect(store.isSelectedDatesEmpty).toBeFalsy()
        expect(store.selectedDates.length === 3).toBeTruthy()
        expect(store.lowerPrice.hotel.id).toEqual(3)
    })

})
