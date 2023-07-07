import { describe, it, expect } from 'vitest'
import { HotelBuilder, createPriceFromObject } from '../hotelsUtils'
import { calculatePriceOfHotel, getCheapest } from '../bookingUtils'


describe('Booking calculation store Test', () => {

    
    it('test calculating price of a single hotel', () => {
        const hotel = new HotelBuilder()
            .setName('Test Lakewood')
            .setSlug('test_lakewood')
            .setId(1)
            .setRating(3)
            .setPriceWeekday(createPriceFromObject({"regular": 110, "reward": 80}))
            .setPriceWeekend(createPriceFromObject({"regular": 90, "reward": 80}))
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
            .setPriceWeekday(createPriceFromObject({"regular": 110, "reward": 80}))
            .setPriceWeekend(createPriceFromObject({"regular": 90, "reward": 80}))
            .build();
        const hotelB = new HotelBuilder()
            .setName('Test Bridgewood')
            .setSlug('test_bridgewood')
            .setId(2)
            .setRating(4)
            .setPriceWeekday(createPriceFromObject({"regular": 160, "reward": 110}))
            .setPriceWeekend(createPriceFromObject({"regular": 60, "reward": 50}))
            .build();
        const hotelC = new HotelBuilder()
            .setName('Test Ridgewood')
            .setSlug('test_ridgewood')
            .setId(3)
            .setRating(5)
            .setPriceWeekday(createPriceFromObject({"regular": 220, "reward": 100}))
            .setPriceWeekend(createPriceFromObject({"regular": 150, "reward": 40}))
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
            .setPriceWeekday(createPriceFromObject({"regular": 110, "reward": 80}))
            .setPriceWeekend(createPriceFromObject({"regular": 90, "reward": 80}))
            .build();
        const hotelB = new HotelBuilder()
            .setName('Test Bridgewood')
            .setSlug('test_bridgewood')
            .setId(2)
            .setRating(4)
            .setPriceWeekday(createPriceFromObject({"regular": 160, "reward": 110}))
            .setPriceWeekend(createPriceFromObject({"regular": 60, "reward": 50}))
            .build();
        const hotelC = new HotelBuilder()
            .setName('Test Ridgewood')
            .setSlug('test_ridgewood')
            .setId(3)
            .setRating(5)
            .setPriceWeekday(createPriceFromObject({"regular": 220, "reward": 100}))
            .setPriceWeekend(createPriceFromObject({"regular": 150, "reward": 40}))
            .build();
        const hotelList = [hotelA, hotelB, hotelC]
        const dates = [new Date(2009, 3, 26), new Date(2009, 3, 27), new Date(2009, 3, 28)]
        
        expect(getCheapest(hotelList, dates, true).hotel.id).toEqual(3)
    })

})
