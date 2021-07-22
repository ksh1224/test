export class State<T = string> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  set(value: T) {
    this.value = value;
  }
}
