import { describe, it, expect } from 'vitest'
import { 
    createPriceFromObject, 
    HotelBuilder, 
    createHotelFromObject, 
    createHotelListFromJsonList,
    getHotelById,
    getHotelBySlug 
} from '../hotelsUtils'

describe('Booking calculation store Test', () => {
    it('Create a price object', () => {
        expect(createPriceFromObject(
            {
                "regular": 110,
                "reward": 80
            }
        ).reward === 80).toBeTruthy()
    })

    it('Create a hotel object', () => {
        const hotel = new HotelBuilder()
            .setName('Test Lakewood')
            .setSlug('test_lakewood')
            .setId(1)
            .setRating(3)
            .setPriceWeekday(createPriceFromObject({"regular": 110, "reward": 80}))
            .setPriceWeekend(createPriceFromObject({"regular": 90, "reward": 80}))
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

    it('Test searching hotel by id', () => {
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
        const hotelList = [hotelB, hotelC]
        const hotel = getHotelBySlug("test_ridgewood", hotelList)
        expect(hotel.id).toEqual(3)
        expect(hotel.name).toMatch('Test Ridgewood')
        expect(hotel.slug).toMatch('test_ridgewood')
    })


})