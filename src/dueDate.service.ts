import { WorkDate } from './workDate';

export class DueDateService {
    public static dateValidatorRegex = /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])T(00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/;

    public static validateDate = (dateStr: string): boolean => DueDateService.dateValidatorRegex.test(dateStr);

    public static validateTurnAround = (turnAround: string): boolean => !isNaN(parseInt(turnAround, 10));

    public static calculateTurnAround = (from: Date, turnAround: number) => {
        const wholeDays = Math.floor(turnAround / 8);
        const hoursRemained = turnAround - (wholeDays << 3);

        const result = new WorkDate(from);

        result.addDays(wholeDays);

        if (hoursRemained > 0) {
            result.addHours(hoursRemained);
        }
        return result.getOnNextWorkDay();
    }
}
