// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
// Services and Models
import { QuizesService } from '../../../../../core/quizes';

@Component({
	selector: 'kt-quizes-list',
	templateUrl: './quizes-list.component.html',
	styleUrls: ['./quizes-list.component.scss']
})
export class QuizesListComponent implements OnInit, OnDestroy {
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	quizes: any[];
	pageIndex = 0;
	limit = 10;
	resultsLength: number = 0;
	disablePrev = true;
	disableNext: boolean;
	constructor(
		private quizesService: QuizesService) { }

	ngOnInit() {
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		this.quizesService.getQuizesCount().subscribe(
			countResult => {
				this.resultsLength = countResult['data'];
				if (this.resultsLength <= 20) {
					this.disableNext = true;
				} else {
					this.disableNext = false;
				}
			}
		);
		let skip = this.pageIndex * this.limit;
		this.getQuizes(skip, this.limit);
	}

	getQuizesCount() {
		this.quizesService.getQuizesCount().subscribe(
			countResult => {
				this.resultsLength = countResult['count'];
				if (this.pageIndex > 0) {
					this.disablePrev = false;
				}
			}
		);
	}

	getQuizes(skip, limit) {
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		this.quizesService.getQuizes(skip, limit).subscribe(
			responseData => {
				this.quizes = responseData['data'];
				this.loadingSubject.next(false);
				console.log('all quiz returned', this.quizes);
			},
			error => {
				console.log('error', error);
			}
		);
	}

	itemNav() {
		if (((this.pageIndex * 10) + 10) >= this.resultsLength) {
			this.disableNext = true;
			console.log('paste total numbers');
		} else {
			this.disableNext = false;
		}
		if (this.pageIndex === 0) {
			this.disablePrev = true;
			console.log('last page');
		} else {
			this.disablePrev = false;
		}
	}

	getNext() {
		this.pageIndex = this.pageIndex + 1;
		let skip = this.pageIndex * this.limit;
		this.getQuizes(skip, this.limit);
		this.getQuizesCount();
		this.itemNav();
	}

	getPrev() {
		this.pageIndex = this.pageIndex - 1;
		let skip = this.pageIndex * this.limit;
		this.getQuizes(skip, this.limit);
		this.getQuizesCount();
		this.itemNav();
	}

	ngOnDestroy() { }
}

