import { IObserver } from './Observer';

export interface ISubject<T> {
  subscribe(observer: IObserver<T>);

  unSubscribe(observer?: IObserver<T>);

  notifyObservers();
}
