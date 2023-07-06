import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useHotelsDataStore } from '@/stores/hotelsDataStore'
import hotelsTestData from './hotelsTestData.json'

describe('Booking calculation store Test', () => {
    let store = null

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useHotelsDataStore()
    })

    it('Create a price object', () => {
        expect(store.createPriceFromObject(
            {
                "regular": 110,
                "reward": 80
            }
        ).reward === 80).toBeTruthy()
    })

    it('Create a hotel object', () => {
        const hotelTest = hotelsTestData[0]
        const hotel = store.createHotelFromObject(hotelTest)
        expect(hotel.id).toEqual(hotelTest.id)
        expect(hotel.name).toMatch(hotelTest.name)
        expect(hotel.slug).toMatch(hotelTest.slug)
        expect(hotel.image).toMatch(hotelTest.image)
        expect(hotel.rating).toEqual(hotelTest.rating)
        expect(hotel.priceWeekday.regular).toEqual(hotelTest.prices.weekday.regular)
        expect(hotel.priceWeekday.reward).toEqual(hotelTest.prices.weekday.reward)
        expect(hotel.priceWeekend.regular).toEqual(hotelTest.prices.weekend.regular)
        expect(hotel.priceWeekend.reward).toEqual(hotelTest.prices.weekend.reward)
    })

    it('Test searching hotel by id and slug', () => {
        const hotelsList = store.createHotelListFromJsonList(hotelsTestData)
        for (const propierty of ["id", "slug"]) {
            for (const hotelTest of hotelsTestData) {
                const hotel = (propierty === "id")
                    ? store.getHotelById(hotelTest[propierty], hotelsList)
                    : store.getHotelBySlug(hotelTest[propierty], hotelsList)
                expect(hotel.id).toEqual(hotelTest.id)
                expect(hotel.name).toMatch(hotelTest.name)
                expect(hotel.slug).toMatch(hotelTest.slug)
                expect(hotel.image).toMatch(hotelTest.image)
                expect(hotel.rating).toEqual(hotelTest.rating)
                expect(hotel.priceWeekday.regular).toEqual(hotelTest.prices.weekday.regular)
                expect(hotel.priceWeekday.reward).toEqual(hotelTest.prices.weekday.reward)
                expect(hotel.priceWeekend.regular).toEqual(hotelTest.prices.weekend.regular)
                expect(hotel.priceWeekend.reward).toEqual(hotelTest.prices.weekend.reward)
            }
        }
    })


})