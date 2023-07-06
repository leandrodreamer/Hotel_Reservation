import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useHotelsDataStore } from '@/stores/hotelsDataStore'
import { useBookingCalculateStore } from '@/stores/bookingCalculateStore'
import hotelsTestData from './hotelsTestData.json'


describe('Booking calculation store Test', () => {
    let store = null
    let storeData = null

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useBookingCalculateStore()
        storeData = useHotelsDataStore()
    })

    it('initializes with zero selected dates', () => {
        expect(store.isSelectedDatesEmpty).toBeTruthy()
    })

    it('test adding a date', () => {
        store.selectedDates = [new Date(2023, 6, 8)]
        expect(store.isSelectedDatesEmpty).toBeFalsy()
    })

    
    it('test calculating price of a single hotel', () => {
        const testHotel = hotelsTestData[0]
        const hotel = storeData.createHotelFromObject(testHotel)
        store.selectedDates = [new Date(2009, 3, 26), new Date(2009, 3, 27), new Date(2009, 3, 28)]
        expect(store.isSelectedDatesEmpty).toBeFalsy()
        expect(store.calculatePriceOfHotel(hotel)).toEqual( (testHotel.prices.weekday.regular * 2) + testHotel.prices.weekend.regular )
    })


    it('test calculating best booking option', () => {
        const hotelList = storeData.createHotelListFromJsonList(hotelsTestData)
        store.selectedDates = [new Date(2009, 3, 16), new Date(2009, 3, 17), new Date(2009, 3, 18)]
        expect(store.isSelectedDatesEmpty).toBeFalsy()
        expect(store.getCheaper(hotelList).hotel.id).toEqual(1)
    })

    it('test calculating best booking option with rewards and a value tie', () => {
        const hotelList = storeData.createHotelListFromJsonList(hotelsTestData)
        store.isReward = true
        store.selectedDates = [new Date(2009, 3, 26), new Date(2009, 3, 27), new Date(2009, 3, 28)]
        expect(store.isSelectedDatesEmpty).toBeFalsy()
        expect(store.getCheaper(hotelList).hotel.id).toEqual(3)
    })

})
