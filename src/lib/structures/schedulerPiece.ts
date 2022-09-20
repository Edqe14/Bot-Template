import { Piece, PieceContext, PieceOptions } from '@sapphire/framework';
import { ScheduledTask, ScheduleOptions } from 'node-cron';

export interface SchedulerOptions extends PieceOptions {
  cron: string;
  opt?: ScheduleOptions;
}

declare interface Scheduler {
  // eslint-disable-next-line no-unused-vars
  run(): unknown;
}

// eslint-disable-next-line no-redeclare
class Scheduler extends Piece {
  public cron: string;

  public opt?: ScheduleOptions;

  public task?: ScheduledTask;

  constructor(context: PieceContext, options: SchedulerOptions) {
    super(context, options);

    this.cron = options.cron;
    this.opt = options.opt;
  }

  setTask(task: ScheduledTask) {
    this.task = task;
  }
}

export default Scheduler;
