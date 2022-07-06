import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from 'src/app/index';
import { map, distinctUntilChanged } from 'rxjs/operators';
import * as ngrx from '@ngrx/store';
import { MainAppState } from 'src/app/store/reducers/auth.reducers';
import { AdminState } from 'src/app/components/admin/store/reducers/auth.reducers';
import { HomeState } from 'src/app/components/home/store/reducers/auth.reducers';
import { Store } from '@ngrx/store';
import { Aritlce_Success } from 'src/app/components/home/store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class MockStore<StateType extends AppState | MainAppState | AdminState | HomeState = AppState | MainAppState | AdminState | HomeState> extends BehaviorSubject<StateType> {
  private selectorsToValues: Map<(...args: any[]) => any, any> = new Map();
  public dispatch = jasmine.createSpy()
  // .and.callFake(
  //   (selector: any): Observable<any> => {
  //      store: new Store<AppState>;
  //     switch (selector.type) {
  //       case '[Homeauth] Aritlce_Success':
  //         store.dispatch(new Aritlce_Success(selector.articles))
  //         break;

  //       default:
  //         break;
  //     }
  //     return this.getObservableWithMockResult(selector).pipe(distinctUntilChanged());
  //   }
  // );

  public select = jasmine.createSpy().and.callFake(
    (selector: any): Observable<any> => {
      return this.getObservableWithMockResult(selector).pipe(distinctUntilChanged());
    }
  );

  constructor(initialState: StateType = null,
    private returnNullForUnhandledSelectors = true) {
    super(null);
    // const defineProperty = Object.defineProperty;
    // Object.defineProperty = (o, p, c) => defineProperty(o, p, Object.assign({}, c ?? {}, { configurable: true }));
    // spyOnProperty(ngrx, 'select').and.callFake(_ => {
    //   return selector => {
    //     return () => this.getObservableWithMockResult(selector).pipe(distinctUntilChanged());
    //   };
    // });
  }

  private getObservableWithMockResult(selector: any): Observable<any> {
    let obs$: Observable<any>;

    if (this.selectorsToValues.has(selector)) {
      const value = this.selectorsToValues.get(selector);

      obs$ = value instanceof Observable ? value : this.pipe(map(() => value));
    } else {
      obs$ = this.pipe(map(() => (this.returnNullForUnhandledSelectors ? null : selector(this.getValue()))));
    }
    return obs$;
  }

  // addSelectorStub<T>(cb: (...args: any[]) => T, mockedValue: T | Observable<T>): this {
  //   this.selectorsToValues.set(cb, mockedValue);
  //   return this;
  // }

  // setState(state: StateType): this {
  //   this.next(state);
  //   return this;
  // }

  // setReturnNullForUnandledSelectors(value: boolean): this {
  //   this.returnNullForUnhandledSelectors = value;
  //   return this;
  // }
}
