import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils';
import Calendar from '../Calendar.vue';

const createWrapper = () => {
    return mount(Calendar);
  };

describe('Calendar', () => {

    it('should generate calendar correctly', () => {
        const wrapper = createWrapper();
        expect(wrapper.vm.calendar.length >= 4).toBeTruthy();
        expect(wrapper.vm.month).toBeTruthy();
    });

    it('test select and unselect a date', async () => {
        const wrapper = createWrapper();

        const dayToSelect = wrapper.find('.calendar-day:not(.disabled)');
        expect(dayToSelect).toBeDefined()
        await dayToSelect.trigger('click');

        expect(wrapper.vm.selected.length).toEqual(1);

        await dayToSelect.trigger('click');

        expect(wrapper.vm.selected.length).toEqual(0);
    });

});