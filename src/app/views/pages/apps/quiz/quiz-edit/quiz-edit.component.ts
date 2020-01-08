// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { QuizesService } from '../../../../../core/quizes';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
// CRUD
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';

// imprts for date hiccup
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports

const moment = _moment;

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-quiz-edit',
	templateUrl: './quiz-edit.component.html',
	styleUrls: ['./quiz-edit.component.scss'],
	providers: [
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
	],
})
export class QuizEditComponent implements OnInit, OnDestroy {
	quiz: any;
	image: any;
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	oldQuiz: QuizesService;
	quizForm: FormGroup;
	hasFormErrors: boolean = false;
	headerMargin: number;
	selectedTab: number = 0;
	selectedFile: File = null;
	idParams: string;
	showModal: boolean = false;
	fSelected;
	fileName;
	formError = 'Oops! Change a few things up and try submitting again.';
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private layoutUtilsService: LayoutUtilsService,
		private fb: FormBuilder,
		private quizesService: QuizesService,
	) { }

	ngOnInit() {
		this.emptyQuizForm();
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		if (this.activatedRoute.snapshot.params['id']) {
			this.idParams = this.activatedRoute.snapshot.params['id'];
			this.getQuizDetails(this.idParams);
		}
		window.onload = () => {
			const style = getComputedStyle(document.getElementById('kt_header'));
			this.headerMargin = parseInt(style.height, 0);
		};
	}

	getQuizDetails(id) {
		console.log('start gettting org detail');
		this.quizesService.getQuiz(id).subscribe(quizDetails => {
			console.log('quiz details full', quizDetails);
			this.quiz = quizDetails['data'];
			const quizData = quizDetails['data'];
			this.initQuizForm(quizData);
			this.loadingSubject.next(false);
			return this.quiz;
		});
	}

	emptyQuizForm() {
		this.quizForm = this.fb.group({
			name: ['', Validators.required],
			address: ['', Validators.required],
			color: [''],
		});
	}
	initQuizForm(quiz: any = {}) {
		this.quizForm = this.fb.group({
			name: [quiz.name || '', Validators.required],
			address: [quiz.address || '', Validators.required],
			color: [quiz.color || '']
		});
	}

	getComponentTitle() {
		let result = `Add quiz`;
		if (this.idParams) {
			result = 'Edit quiz';
		}
		return result;
	}

	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.quizForm.controls;
		this.loadingSubject.next(true);
		if (this.quizForm.invalid) {
			this.loadingSubject.next(false);
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}
		if (this.idParams) {
			let editedQuiz = this.quizForm.value;
			console.log('Quiz to send', editedQuiz);
			this.updateQuiz();
			return;
		} else {
			this.addQuiz();
		}
	}

	updateQuiz() {
		this.loadingSubject.next(true);
		let updPayload = new FormData();
		updPayload.append('name', this.quizForm.get('name').value);
		updPayload.append('address', this.quizForm.get('address').value);
		updPayload.append('color', this.quizForm.get('color').value);
		if (this.fSelected) {
			updPayload.append('logo', this.fSelected, this.fSelected.name);
		}
		this.quizesService.updateQuiz(this.idParams, updPayload).subscribe(
			data => {
				console.log('success reponse', data);
				this.loadingSubject.next(false);
				const message = `Quiz has been Successfully Updated`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				this.router.navigate(['/para/quizes']);
			},
			error => {
				this.loadingSubject.next(false);
				console.log('Error response', error);
				const message = 'Sorry, Temporary Error Occured';
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
			});
	}

	addQuiz() {
		this.loadingSubject.next(true);
		let updPayload = new FormData();
		updPayload.append('name', this.quizForm.get('name').value);
		updPayload.append('address', this.quizForm.get('address').value);
		updPayload.append('color', this.quizForm.get('color').value);
		if (this.fSelected) {
			updPayload.append('logo', this.fSelected, this.fSelected.name);
		}
		this.quizesService.createQuiz(updPayload).subscribe(
			data => {
				this.loadingSubject.next(false);
				console.log('success reponse', data);
				const message = `Success`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				this.router.navigate(['/cdash/quiz/quizes']);
			}, error => {
				this.loadingSubject.next(false);
				console.log('Error response', error);
				const title = 'Please Retry';
				const message = 'Sorry, Temporary Error Occured';
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
			});
	}

	reset() {
		this.quiz = Object.assign({}, this.oldQuiz);
		this.emptyQuizForm();
		this.hasFormErrors = false;
		this.quizForm.markAsPristine();
		this.quizForm.markAsUntouched();
		this.quizForm.updateValueAndValidity();
	}

	onFileChange(event) {
		if (event.target.files.length > 0) {
			this.fSelected = event.target.files[0];
			this.fileName = event.target.files[0].name;
		}
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	ngOnDestroy() { }

}
