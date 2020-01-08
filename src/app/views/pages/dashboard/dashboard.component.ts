// Angular
import { Component, OnInit } from '@angular/core';
import { LayoutUtilsService } from '../../../core/_base/crud';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../../../core/auth';
import { AppState } from '../../../core/reducers';
import { Router } from '@angular/router';
// calender
import { UserService } from '../../../core/users';
import { AssetsService } from '../../../core/assets';
import { AuthService } from '../../../core/auth';
import { ComputationsService } from '../../../core/computations';

@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	user$: Observable<User>;
	leadsCount = '...';
	contactsCount = '...';
	assetsCount = 0;
	vendorsCount = '...';
	maturityAverage = '...';
	usersCount = '...';
	staffsCount = '...';
	constructor(
		private auth: AuthService,
		private usersService: UserService,
		private assetsService: AssetsService,
		private computationsService: ComputationsService,
		private store: Store<AppState>,
		private router: Router,
		private layoutUtilsService: LayoutUtilsService
	) { }

	ngOnInit() {
		this.auth.checkOrganization().subscribe(response => {
			if (response.status === true && localStorage.getItem('userToken')) {
				return;
			} else {
				this.router.navigate(['/auth/login']);
			}
		});
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		this.initAssets();
		this.getUsersCount();
		this.getStaffsCount();
		this.getMaturityScoreAverage();
		console.clear();
	}

	getUsersCount() {
		this.loadingSubject.next(true);
		this.usersService.getUsersCount().subscribe(
			countResult => {
				this.loadingSubject.next(false);
				this.usersCount = countResult['data'];
			}
		);
	}

	getMaturityScoreAverage() {
		this.loadingSubject.next(true);
		this.computationsService.getScoreAverage().subscribe(
			countResult => {
				this.maturityAverage = countResult['average'];
				this.loadingSubject.next(false);
			}
		);
	}

	getStaffsCount() {
		this.loadingSubject.next(true);
		this.usersService.getStaffsCount().subscribe(
			countResult => {
				this.staffsCount = countResult['data'];
				this.loadingSubject.next(false);
			}
		);
	}
	initAssets() {
		this.loadingSubject.next(true);
		const payload = {
			id: null
		};
		this.assetsService.getAllAssetsCount(payload).subscribe(
			assetsCountr => {
				this.assetsCount = assetsCountr['all_data'];
				this.loadingSubject.next(false);
			}
		);
	}

}
