import { DueDateService } from './dueDate.service';
import { WorkDate } from './workDate';

export class DueDateApplication {
    private _date: Date;
    private _turn: number;

    constructor (params: string[]) {
        this.printDescription();
        if (!this.validateAndStore(params)) {
            process.exit(1);
        }

        const result = this.calculate();
        console.log(`Will be completed by ${result.getFormatted()}`);
    }

    private validateAndStore = (params: string[]) => {
        if (params.length < 2) {
            console.log('Not enough parameters');
            return false;
        }

        const date = params[0];
        if (!DueDateService.validateDate(date)) {
            console.log(`Error: Invalid date format: ${date}`);
            return false;
        }
        this._date = new Date(date);

        const turn = params[1];
        if (!DueDateService.validateTurnAround(turn)) {
            console.log(`Error: Invalid turn format: ${turn}`);
            return false;
        }
        this._turn = parseInt(turn, 10);
        return true;
    }

    public calculate = (): WorkDate => {
        return DueDateService.calculateTurnAround(this._date, this._turn);
    }

    private printDescription = () => {
        console.log('DueDate application');
        console.log('Description: due date calculator in an issue tracking system.');
        console.log('Usage: node dist/app.js time turntime');
        console.log('Parameters:');
        console.log('\ttime: yyyy-[MM|M]-[dd|d]Thh:mm (2020-02-10T13:25)');
        console.log('\tturnTime: turnaround time in hours (16)\n');
    }

    public vaidateParameters = (date: string, turnAround: string): boolean =>
        DueDateService.validateDate(date) && DueDateService.validateTurnAround(turnAround)
}
