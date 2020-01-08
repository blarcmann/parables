// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

// Services and Models
import { QuizesService } from '../../../../../core/quizes';
import { Location } from '@angular/common';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-quiz',
	templateUrl: './quiz.component.html',
	styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	quizDetails;
	hasFormErrors: boolean = false;
	idParams = '';
	constructor(
		private quizsService: QuizesService,
		private _location: Location,
		private activatedRoute: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		if (this.activatedRoute.snapshot.params['id']) {
			this.idParams = this.activatedRoute.snapshot.params['id'];
		}
		this.getQuizDetails();
	}

	getQuizDetails() {
		this.loadingSubject.next(true);
		this.quizsService.getQuiz(this.idParams).subscribe(quizDetails => {
			this.quizDetails = quizDetails['data'];
			this.loadingSubject.next(false);
		});
	}

	goBack() {
		this._location.back();
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	ngOnDestroy() { }
}
