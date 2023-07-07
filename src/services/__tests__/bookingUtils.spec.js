import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useHotelsDataStore } from '@/stores/hotelsDataStore'
import { calculatePriceOfHotel, getCheapest } from '@/services/bookingUtils'


describe('Booking calculation store Test', () => {
    let storeData = null

    beforeEach(() => {
        setActivePinia(createPinia())
        storeData = useHotelsDataStore()
    })

    
    it('test calculating price of a single hotel', () => {
        const hotel = storeData.createHotelFromObject({
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
        });
        const dates = [new Date(2009, 3, 26), new Date(2009, 3, 27), new Date(2009, 3, 28)]

        expect(calculatePriceOfHotel(hotel, dates, false)).toEqual( 310 )
    })


    it('test calculating best booking option', () => {
        const hotelA = storeData.createHotelFromObject({
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
        });

        const hotelB = storeData.createHotelFromObject({
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
        });

        const hotelC = storeData.createHotelFromObject({
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
        });
        const hotelList = [hotelA, hotelB, hotelC]
        const dates = [new Date(2009, 3, 16), new Date(2009, 3, 17), new Date(2009, 3, 18)]

        expect(getCheapest(hotelList, dates, false).hotel.id).toEqual(1)
    })

    it('test calculating best booking option with rewards and a value tie', () => {
        const hotelA = storeData.createHotelFromObject({
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
        });

        const hotelB = storeData.createHotelFromObject({
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
        });

        const hotelC = storeData.createHotelFromObject({
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
        });
        const hotelList = [hotelA, hotelB, hotelC]
        const dates = [new Date(2009, 3, 26), new Date(2009, 3, 27), new Date(2009, 3, 28)]
        
        expect(getCheapest(hotelList, dates, true).hotel.id).toEqual(3)
    })

})
