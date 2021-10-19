/* Reference:
 * https://github.com/YorkAARGH/Sapphire-slashies-example/blob/master/src/lib/structures/SlashCommandStore.js
 */
import Scheduler from './SchedulerPiece';
import { Store } from '@sapphire/framework';
import { schedule, ScheduledTask, validate } from 'node-cron';
import { Collection } from 'discord.js';
import { nanoid } from 'nanoid';
import ms from 'ms';

export default class SchedulerStore extends Store<Scheduler> {
  // eslint-disable-next-line no-undef
  public timers = new Collection<string, NodeJS.Timeout | ScheduledTask>();

  constructor() {
    super(Scheduler, { name: 'schedulers' });
  }

  scheduleAll() {
    this.each((sc) => {
      try {
        const task = schedule(sc.cron, () => sc.run(), sc.opt);
        sc.setTask(task);

        this.timers.set(nanoid(), task);
      } catch (e) {
        this.container.logger.fatal(e);
        throw e;
      }
    });

    return this.size;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  schedule(expression: string | number, runner: Function, options = {}) {
    const isCron = typeof expression === 'string' && validate(expression);
    if (isCron) {
      try {
        const task = schedule(expression, () => runner(), options);
        this.timers.set(nanoid(), task);

        return task;
      } catch (e) {
        this.container.logger.fatal(e);
        throw e;
      }
    }

    const duration = typeof expression === 'string' ? ms(expression) : expression;
    if (Number.isNaN(duration)) throw new TypeError('Expression must be a number');

    const id = nanoid();
    const timeout = setTimeout(() => {
      runner();
      this.timers.delete(id);
    }, duration as number);

    this.timers.set(id, timeout);

    return timeout;
  }
}
