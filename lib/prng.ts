// Adapted from http://stackoverflow.com/questions/521295/javascript-random-seeds#answer-19301306
export class Prng {
  private m_w: number;
  private m_z: number;
  private mask: number;

  constructor(seed?: number) {
    if (seed) {
      this.seed(seed);
    } else {
      this.reset();
    }
  }

  public reset(): void {
    this.m_w = 123456789;
    this.m_z = 987654321;
    this.mask = 0xffffffff;
  }

  public seed(seed: number, reset?: boolean): void {
    if (reset === undefined || reset === true) {
      this.reset();
    }
    this.m_w = seed;
  }

  public random(): number {
    this.m_z = (36969 * (this.m_z & 65535) + (this.m_z >> 16)) & this.mask;
    this.m_w = (18000 * (this.m_w & 65535) + (this.m_w >> 16)) & this.mask;
    let result = ((this.m_z << 16) + this.m_w) & this.mask;
    result /= 4294967296;
    return result + 0.5;
  }
}
