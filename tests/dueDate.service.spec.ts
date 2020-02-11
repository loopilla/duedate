import { DueDateService } from '../src/dueDate.service';
import { expect } from 'chai';
import * as mocha from 'mocha';

describe('DueDate Service tests', () => {
    describe('Time parameter test', () => {
        // As this is a static class can be tested easily
        it('out of month range date format should failed', () => {
            expect(DueDateService.validateDate('2020-13-11T12:14')).to.be.false;
        });

        it('date format should pass', () => {
            expect(DueDateService.validateDate('2020-02-11T12:14')).to.be.true;
        });
    });
    describe('turAround parameter test', () => {
        // As this is a static class can be tested easily
        it('invalid number should fail', () => {
            expect(DueDateService.validateTurnAround('Bela')).to.be.false;
        });

        it('valid number should pass', () => {
            expect(DueDateService.validateTurnAround('22')).to.be.true;
        });
    });
});
