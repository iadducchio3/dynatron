import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private subs = new Map<string, BehaviorSubject<any>>();

  public get<T = any>(key: string): Observable<T | null> {
    const val = sessionStorage.getItem(key);
    if (!this.subs.has(key)) this.subs.set(key, new BehaviorSubject(val));
    return this.subs
      .get(key)!
      .asObservable()
      .pipe(
        distinctUntilChanged(),
        map((val) => JSON.parse(val) as T)
      );
  }

  public set(key: string, value: any): void {
    const valueString = JSON.stringify(value);
    sessionStorage.setItem(key, valueString);
    if (this.subs.has(key)) this.subs.get(key)!.next(valueString);
    else this.subs.set(key, new BehaviorSubject(valueString));
  }
}
