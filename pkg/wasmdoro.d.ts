/* tslint:disable */
export class WasmdoroTimer {
free(): void;

static  new(): WasmdoroTimer;

 start_pomodoro(): void;

 reset_pomodoro(): void;

 successful_pomodoro(): void;

 pomodoro_count(): number;

 inprogress_pomodoro(): boolean;

 times_up(): boolean;

 decrement_time(): void;

 render(): string;

}
