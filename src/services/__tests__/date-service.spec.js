import { describe, it, expect } from 'vitest'
import { isSameDate, isWeekend } from '../date-service'


describe('date service Test', () => {

    it('test isWeekend function on weekday', () => {
        const dateWeekday = new Date(2023, 6, 13)
        expect(isWeekend(dateWeekday)).toBeFalsy()
    })

    it('test isWeekend function on weekend', () => {
        const dateWeekend = new Date(2023, 6, 15)
        expect(isWeekend(dateWeekend)).toBeTruthy()
    })

    it('test isSameDate with diferent dates', () => {
        const dateA = new Date(2023, 6, 13)
        const dateB = new Date(2023, 6, 15)
        expect(isSameDate(dateA, dateB)).toBeFalsy()
    })

    it('test isSameDate with same dates', () => {
        const dateA = new Date(2023, 6, 10)
        const dateB = new Date(2023, 6, 10)
        expect(isSameDate(dateA, dateB)).toBeTruthy()
    })

})
