import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useHotelsDataStore } from '@/stores/hotelsDataStore'

describe('Booking calculation store Test', () => {
    let store = null

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useHotelsDataStore()
    })

    it('check if the hotels data was loaded', () => {
        expect(store.hotels.length === 0).toBeFalsy()
    })

    it('test finding hotel by id', () => {
        expect(store.getHotelById(2).slug === 'bridgewood').toBeTruthy()
    })

    it('test finding hotel by slug', () => {
        expect(store.getHotelBySlug('lakewood').id === 1).toBeTruthy()
    })


})