// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
// Services and Models
import { AdvertsService } from '../../../../../core/adverts';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { Router } from '@angular/router';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-adverts-list',
	templateUrl: './adverts-list.component.html',
	styleUrls: ['./adverts-list.component.scss']
})
export class AdvertsListComponent implements OnInit, OnDestroy {
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	validURL = '';
	pageIndex = 0;
	limit = 10;
	resultsLength: number = 0;
	disablePrev = true;
	disableNext: boolean;
	adverts;
	constructor(
		private advertsService: AdvertsService,
		private layoutUtilsService: LayoutUtilsService) { }

	ngOnInit() {
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		let skip = this.pageIndex * this.limit;
		this.getAllAdverts(skip, this.limit);
		this.advertsService.countAdverts().subscribe(
			countResult => {
				this.resultsLength = countResult['data'];
				this.loadingSubject.next(false);
				if (this.resultsLength <= 10) {
					console.log('not up to 10', this.resultsLength);
					this.disableNext = true;
				} else {
					console.log('up to 10', this.resultsLength);
					this.disableNext = false;
				}
			}
		);
	}

	countAdverts() {
		this.loadingSubject.next(true);
		this.advertsService.countAdverts().subscribe(
			countResult => {
				this.resultsLength = countResult['data'];
				if (this.pageIndex > 0) {
					this.disablePrev = false;
				}
			}
		);
	}


	getAllAdverts(skip, limit) {
		this.loadingSubject.next(true);
		this.advertsService.getAllAdverts(skip, limit).subscribe(
			advertss => {
				console.log('soadvertls', advertss);
				this.loadingSubject.next(false);
				this.adverts = advertss['data'];
			}
		);
	}

	itemNav() {
		if (((this.pageIndex * 10) + 10) >= this.resultsLength) {
			this.disableNext = true;
			console.log('paste total numbers');
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
		this.getAllAdverts(skip, this.limit);
		this.countAdverts();
		this.itemNav();
	}

	getPrev() {
		this.pageIndex = this.pageIndex - 1;
		let skip = this.pageIndex * this.limit;
		this.getAllAdverts(skip, this.limit);
		this.countAdverts();
		this.itemNav();
	}

	ngOnDestroy() { }
}
