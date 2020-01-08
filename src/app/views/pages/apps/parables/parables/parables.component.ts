// Angular
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
// Services and Models
import { ParablesService } from '../../../../../core/parables';


@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-parables',
	templateUrl: './parables.component.html',
	styleUrls: ['./parables.component.scss']
})
export class AllParablesComponent implements OnInit, OnDestroy {
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	parables: any[] = [];
	pageIndex = 0;
	limit = 20;
	resultsLength: number = 0;
	disablePrev = true;
	disableNext: boolean;
	editedProject;
	constructor(
		private parablesService: ParablesService,) { }

	ngOnInit() {
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		let skip = this.pageIndex * this.limit;
		this.getParables(skip, this.limit);
	}

	getParablesCount() {
		this.loadingSubject.next(true);
		this.parablesService.getParablesCount().subscribe(
			countResult => {
				this.resultsLength = countResult['data'];
				if (this.pageIndex > 0) {
					this.disablePrev = false;
				}
			}
		);
	}

	getParables(skip, limit) {
		this.loadingSubject.next(true);
		this.parablesService.getParables(skip, limit).subscribe(
			responseData => {
				this.parables = responseData['data'];
				console.log('looooooooogs', this.parables);
				this.loadingSubject.next(false);
			},
			error => {
				console.log('error', error);
			}
		);
	}

	itemNav() {
		if (((this.pageIndex * 20) + 20) >= this.resultsLength) {
			this.disableNext = true;
			// return;
		} else {
			this.disableNext = false;
		}
		if (this.pageIndex === 0) {
			this.disablePrev = true;
			console.log('last page');
			// return;
		} else {
			this.disablePrev = false;
		}
	}
	getNext() {
		this.pageIndex = this.pageIndex + 1;
		let skip = this.pageIndex * this.limit;
		this.getParables(skip, this.limit);
		this.getParablesCount();
		this.itemNav();
	}

	getPrev() {
		this.pageIndex = this.pageIndex - 1;
		let skip = this.pageIndex * this.limit;
		this.getParables(skip, this.limit);
		this.getParablesCount();
		this.itemNav();
	}

	ngOnDestroy() { }
}
