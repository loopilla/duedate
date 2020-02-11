import { WorkDate, WEEKDAYS } from '../src/workDate';
import { expect } from 'chai';
import * as mocha from 'mocha';

describe('WorkDate class tests', () => {
    let workDate = new WorkDate();

    beforeEach(() => {
        workDate = new WorkDate(new Date('2020-02-10T15:12'));
    });

    describe('Increment days', () => {
        // As this is a static class can be tested easily
        it('Add 1 day should ends on the same day', () => {
            const startDate = new Date('2020-02-11T12:14');
            expect(new WorkDate(startDate).addDays(1).getDay() === startDate.getDay() + 1).to.be.true;
        });

        it('Adding 1 day on Friday should ends on Monday', () => {
            const startDate = new Date('2020-02-14T12:14');
            expect(new WorkDate(startDate).addDays(1).getOnNextWorkDay().getDay() === WEEKDAYS.MONDAY).to.be.true;
        });
    });
    describe('Increment hours', () => {
        // As this is a static class can be tested easily
        it('Add 2 hours in-day should steady', () => {
            const startDate = new Date('2020-02-11T12:14');
            expect(new WorkDate(startDate).addHours(2).getOnNextWorkDay().getDay() === startDate.getDay()).to.be.true;
        });

        it('Adding hours should ends on next day', () => {
            const startDate = new Date('2020-02-11T12:14');
            expect(new WorkDate(startDate).addHours(8).getDay() === startDate.getDay() + 1).to.be.true;
        });

        it('Adding hours should ends on next week', () => {
            const startDate = new Date('2020-02-14T12:14');
            expect(new WorkDate(startDate).addHours(8).getOnNextWorkDay().getDay() === WEEKDAYS.MONDAY).to.be.true;
        });
    });
});
