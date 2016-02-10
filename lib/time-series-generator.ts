import {Value} from './value';
import {Prng} from './prng';

export class TimeSeriesGenerator {
  private static last: number;
  private static prng: Prng;

  public static generate(
    timeInterval: number,
    startTimestamp: number,
    endTimestamp: number,
    limits: number[]
  ) {
    var values = [];
    this.prng = new Prng(timeInterval + startTimestamp + endTimestamp + limits[0] + limits[1]);
    this.last = this.prng.random();
    let difference = Math.abs(endTimestamp - startTimestamp);
    for (let i = 0; i <= Math.floor(difference / timeInterval); i++) {
      this.addStep(values, timeInterval, startTimestamp);
    }
    this.applyLimits(values, limits);
    return values;
  }

  private static addStep(values: Value[], timeInterval, startTimestamp) {
    let rand = this.prng.random() * 100 + 15 + this.last;
    this.last = rand * 0.85;
    let index = values.length;
    let counter = 1;

    let randomVariance = this.prng.random() * 0.47;
    let v = rand / 47 + Math.sin(5100 + index / 5700) * 47 + counter++ +
      (Math.cos(index / 12) + 5) * 4 +
      (Math.cos((index * counter * 12) / 987) + 2) * 12 +
      (Math.cos(index / 8) + randomVariance) * 2 +
      (Math.cos(index / 470)) * counter;

    values.push({
      timestamp: (index * timeInterval) + startTimestamp,
      value: v + randomVariance
    });

  }

  private static applyLimits(values: Value[], limits): void {
    let vMin = values[0].value;
    let vMax = values[0].value;
    values.forEach(value => {
      if (vMin > value.value) {
        vMin = value.value;
      }
      if (vMax < value.value) {
        vMax = value.value;
      }
    });
    // unfortunately, this won't work for large arrays
    // let vMax = Math.max.apply(Math, values.map(value => value.value));
    // let vMin = Math.min.apply(Math, values.map(value => value.value));
    let min = limits[0];
    let max = limits[1];
    values = values.map(value => {
      value.value = ((max - min) * (value.value - vMin) / (vMax - vMin)) + min;
      return value;
    });
  }
}
