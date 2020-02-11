export enum WEEKDAYS {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WENDNESDAY = 3,
    THURSTDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6
};

export const WORKDAYS = [
    WEEKDAYS.MONDAY,
    WEEKDAYS.TUESDAY,
    WEEKDAYS.WENDNESDAY,
    WEEKDAYS.TUESDAY,
    WEEKDAYS.FRIDAY
];

export const DAY_START_HOUR = 9;
export const DAY_END_HOUR = 17;

export class WorkDate extends Date {
    public static DAYINMS = 24 * 60 * 1000;
    public static HOURINMS = 60 * 60 * 1000;

    constructor (date: Date = new Date()) {
        super(date);
    }

    public addHours = (hours: number): WorkDate => {
        this.setTime(this.getTime() + hours * WorkDate.HOURINMS);
        // Check is in valid interval

        if (this.getHours() < DAY_START_HOUR || this.getHours() >= DAY_END_HOUR) {
            this.setTime(this.getTime() + 16 * WorkDate.HOURINMS);
        }
        return this;
    }

    public addDays = (daysToAdd: number): WorkDate => {
        this.setDate(this.getDate() + daysToAdd);
        return this;
    }

    public getOnNextWorkDay = (): WorkDate => {
        while(this.isWeekEnd()) {
            this.addDays(1);
        }
        return this;
    }

    public isWeekEnd = (): boolean => !WORKDAYS.includes(this.getDay());

    public isWorkDay = (): boolean => !this.isWeekEnd();

    public getFormatted = () => {
        const date = new Date(this.getTime());

        const options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };

        return date.toLocaleDateString('en-US', options);
    }
}