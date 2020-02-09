import { Application } from '../src/app';
import { expect } from 'chai';
import * as mocha from 'mocha';

describe('App test', () => {

    it('should fail', () => {
        const result = Application.convert();
        expect(result).to.be.false;
    })
});
