import { describe, it, expect } from 'vitest'
import Price from '@/models/price'
import HotelBuilder from '@/models/hotel-builder'
import { calculatePriceOfHotel, getCheapest } from '../booking-service'


describe('Booking calculation Test', () => {

    it('test calculating price of a single hotel', () => {
        const hotel = new HotelBuilder()
            .setName('Test Lakewood')
            .setSlug('test_lakewood')
            .setId(1)
            .setRating(3)
            .setPriceWeekday(new Price(110, 80))
            .setPriceWeekend(new Price(90, 80))
            .build();
        const dates = [new Date(2009, 3, 26), new Date(2009, 3, 27), new Date(2009, 3, 28)]

        expect(calculatePriceOfHotel(hotel, dates, false)).toEqual( 310 )
    })


    it('test calculating best booking option', () => {
        const hotelA = new HotelBuilder()
            .setName('Test Lakewood')
            .setSlug('test_lakewood')
            .setId(1)
            .setRating(3)
            .setPriceWeekday(new Price(110, 80))
            .setPriceWeekend(new Price(90, 80))
            .build();
        const hotelB = new HotelBuilder()
            .setName('Test Bridgewood')
            .setSlug('test_bridgewood')
            .setId(2)
            .setRating(4)
            .setPriceWeekday(new Price(160, 110))
            .setPriceWeekend(new Price(60, 50))
            .build();
        const hotelC = new HotelBuilder()
            .setName('Test Ridgewood')
            .setSlug('test_ridgewood')
            .setId(3)
            .setRating(5)
            .setPriceWeekday(new Price(220, 100))
            .setPriceWeekend(new Price(150, 40))
            .build();
        const hotelList = [hotelA, hotelB, hotelC]
        const dates = [new Date(2009, 3, 16), new Date(2009, 3, 17), new Date(2009, 3, 18)]

        expect(getCheapest(hotelList, dates, false).hotel.id).toEqual(1)
    })

    it('test calculating best booking option with rewards and a value tie', () => {
        const hotelA = new HotelBuilder()
            .setName('Test Lakewood')
            .setSlug('test_lakewood')
            .setId(1)
            .setRating(3)
            .setPriceWeekday(new Price(110, 80))
            .setPriceWeekend(new Price(90, 80))
            .build();
        const hotelB = new HotelBuilder()
            .setName('Test Bridgewood')
            .setSlug('test_bridgewood')
            .setId(2)
            .setRating(4)
            .setPriceWeekday(new Price(160, 110))
            .setPriceWeekend(new Price(60, 50))
            .build();
        const hotelC = new HotelBuilder()
            .setName('Test Ridgewood')
            .setSlug('test_ridgewood')
            .setId(3)
            .setRating(5)
            .setPriceWeekday(new Price(220, 100))
            .setPriceWeekend(new Price(150, 40))
            .build();
        const hotelList = [hotelA, hotelB, hotelC]
        const dates = [new Date(2009, 3, 26), new Date(2009, 3, 27), new Date(2009, 3, 28)]
        
        expect(getCheapest(hotelList, dates, true).hotel.id).toEqual(3)
    })

})
