import './style.css';

import { of, map } from 'rxjs';

// of('World')
//   .pipe(map((name) => `Hello, ${name}!`))
//   .subscribe(console.log);

// // Open the console in the bottom right to see results.

console.clear()
console.log(new Date().toISOString());

import { Subject, BehaviorSubject, empty, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const subject = new Subject<number>();
const subjectOne = new BehaviorSubject<string>('Subject One');
const subjectTwo = new BehaviorSubject<string>('Subject Two');
const subjectThree = new BehaviorSubject<string>('Subject Three');

function switchToSubject<T>(...subjects: BehaviorSubject<T>[]) {
  return (source: Observable<number>) =>
    source.pipe(
      switchMap(value => {
        const subject = subjects[value - 1];
        return subject ? subject : empty(); // ignore values that are not between 1-3
      })
    );
}

subject.pipe(
  switchToSubject(subjectOne, subjectTwo, subjectThree)
).subscribe(value => console.log(value));

// Emit values between 1-3 from the original subject
subject.next(1); // This will switch to subjectOne
subject.next(2); // This will switch to subjectTwo
subject.next(3); // This will switch to subjectThree
subject.next(4); // This will be ignored

// Emit values from the switched subjects
subjectOne.next('Hello from Subject One!');
subjectTwo.next('Hello from Subject Two!');
subjectThree.next('Hello from Subject Three!');
