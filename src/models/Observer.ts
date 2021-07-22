export interface IObserver<T = string> {
  get();
  set(value: T);
}
