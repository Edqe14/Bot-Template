import { Piece, PieceContext, PieceOptions } from '@sapphire/framework';
import { ScheduledTask, ScheduleOptions } from 'node-cron';

export interface SchedulerOptions extends PieceOptions {
  cron: string;
  options?: ScheduleOptions;
}

declare interface Scheduler {
  // eslint-disable-next-line no-unused-vars
  run(): unknown;
}

// eslint-disable-next-line no-redeclare
class Scheduler extends Piece {
  public cron: string;

  public options?: ScheduleOptions;

  public task?: ScheduledTask;

  constructor(context: PieceContext, options: SchedulerOptions) {
    super(context, options);

    this.cron = options.cron;
    this.options = options.options;
  }

  setTask(task: ScheduledTask) {
    this.task = task;
  }
}

export default Scheduler;
