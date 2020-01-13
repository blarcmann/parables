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
import { ParablesService } from '../../../core/parables';
import { AuthService } from '../../../core/auth';
import { AdvertsService } from '../../../core/adverts';
import { QuizesService } from '../../../core/quizes';

@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	user$: Observable<User>;
	quizCount = '...';
	contactsCount = '...';
	parablesCount = '...';
	vendorsCount = '...';
	advertCount = '...';
	usersCount = '...';
	staffsCount = '...';
	leaders;
	constructor(
		private auth: AuthService,
		private usersService: UserService,
		private parablesService: ParablesService,
		private advertsService: AdvertsService,
		private quizService: QuizesService,
		private store: Store<AppState>,
		private router: Router,
		private layoutUtilsService: LayoutUtilsService
	) { }

	ngOnInit() {
		console.log('got to admin......');
		this.auth.checkAdmin().subscribe(response => {
			console.log('admin API called');
			if (response.status === true && localStorage.getItem('userToken')) {
				return;
			} else {
				this.router.navigate(['/auth/login']);
			}
		});
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		this.getAdCount();
		this.getUsersCount();
		this.getParablesCount();
		this.getQuizCount();
		this.getLeaders();
	}

	getLeaders() {
		this.loadingSubject.next(true);
		this.quizService.getLeaderscore().subscribe(
			responseData => {
				this.leaders = responseData['data'];
				this.loadingSubject.next(false);
			},
			error => {
				console.log('error', error);
			}
		);
	}

	getQuizCount() {
		this.loadingSubject.next(true);
		this.quizService.getQuizesCount().subscribe(
			responseData => {
				this.quizCount = responseData['data'];
				this.loadingSubject.next(false);
			},
			error => {
				console.log('error', error);
			}
		);
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

	getAdCount() {
		this.loadingSubject.next(true);
		this.advertsService.countAdverts().subscribe(
			countResult => {
				this.advertCount = countResult['data'];
				this.loadingSubject.next(false);
			}
		);
	}

	getParablesCount() {
		this.loadingSubject.next(true);
		const payload = {
			id: null
		};
		this.parablesService.getParablesCount().subscribe(
			assetsCountr => {
				this.parablesCount = assetsCountr['data'];
				this.loadingSubject.next(false);
			}
		);
	}

}
