import { describe, it, expect } from 'vitest'
import { 
    Price,
    HotelBuilder,
    createHotelFromObject, 
    createHotelListFromJsonList,
    getHotelById,
    getHotelBySlug 
} from '../hotels-service'

describe('Hotel classes Test', () => {

    it('Create a price object', () => {
        const price = new Price(110, 80)
        expect(price.reward).toBe(80)
    })

    it('Create a hotel object', () => {
        const hotel = new HotelBuilder()
            .setName('Test Lakewood')
            .setSlug('test_lakewood')
            .setId(1)
            .setRating(3)
            .setPriceWeekday(new Price(110, 80))
            .setPriceWeekend(new Price(90, 80))
            .build();
        expect(hotel.id).toEqual(1)
        expect(hotel.name).toMatch('Test Lakewood')
        expect(hotel.slug).toMatch('test_lakewood')
        expect(hotel.rating).toEqual(3)
        expect(hotel.priceWeekday.regular).toEqual(110)
        expect(hotel.priceWeekend.reward).toEqual(80)
    })

    it('Create a hotel object from json data', () => {
        const hotel = createHotelFromObject({
            "name": "Test Lakewood",
            "slug": "test_lakewood",
            "id": 1,
            "rating": 3,
            "prices": {
                "weekday": {
                    "regular": 110,
                    "reward": 80
                },
                "weekend": {
                    "regular": 90,
                    "reward": 80
                }
            },
            "image": "images/lakewood.jpeg"
        })
        expect(hotel.id).toEqual(1)
        expect(hotel.name).toMatch('Test Lakewood')
        expect(hotel.slug).toMatch('test_lakewood')
        expect(hotel.rating).toEqual(3)
        expect(hotel.priceWeekday.regular).toEqual(110)
        expect(hotel.priceWeekend.reward).toEqual(80)
    })

    it('Create a hotel list from json data', () => {
        const hotel = createHotelListFromJsonList([{
            "name": "Test Lakewood",
            "slug": "test_lakewood",
            "id": 1,
            "rating": 3,
            "prices": {
                "weekday": {
                    "regular": 110,
                    "reward": 80
                },
                "weekend": {
                    "regular": 90,
                    "reward": 80
                }
            },
            "image": "images/lakewood.jpeg"
        },
        {
            "name": "Test Bridgewood",
            "slug": "test_bridgewood",
            "id": 2,
            "rating": 4,
            "prices": {
                "weekday": {
                    "regular": 160,
                    "reward": 110
                },
                "weekend": {
                    "regular": 60,
                    "reward": 50
                }
            },
            "image": "images/bridgewood.jpeg"
        },
        {
            "name": "Test Ridgewood",
            "slug": "test_ridgewood",
            "id": 3,
            "rating": 5,
            "prices": {
                "weekday": {
                    "regular": 220,
                    "reward": 100
                },
                "weekend": {
                    "regular": 150,
                    "reward": 40
                }
            },
            "image": "images/ridgewood.jpeg"
        }])
        expect(hotel.length).toEqual(3)
    })
})

describe('Hotel calculations Test', () => {

    it('Test searching hotel by id', () => {
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
        const hotelList = [hotelB, hotelC]
        const hotel = getHotelById(2, hotelList)
        expect(hotel.id).toEqual(2)
        expect(hotel.name).toMatch('Test Bridgewood')
        expect(hotel.slug).toMatch('test_bridgewood')
    })

    it('Test searching hotel by slug', () => {
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
        const hotelList = [hotelB, hotelC]
        const hotel = getHotelBySlug("test_ridgewood", hotelList)
        expect(hotel.id).toEqual(3)
        expect(hotel.name).toMatch('Test Ridgewood')
        expect(hotel.slug).toMatch('test_ridgewood')
    })


})