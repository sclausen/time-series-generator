export class DateObject {
  private parts: number[];
  constructor(private str: string) {
    this.parts = str.split("-").map((part)=>{
      return parseInt(part, 10);
    });
  }

  public get startDate(): Date {
    return new Date(this.parts[0], this.parts[1] -1, this.parts[2], 0, 0, 0, 0);
  }

  public get endDate(): Date {
    return new Date(this.parts[0], this.parts[1] -1, this.parts[2], 23, 59, 59, 999);
  }
}
