// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { ParablesService } from '../../../../../core/parables';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
// CRUD
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { tap, map } from 'rxjs/operators';

// imprts for date hiccup
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports

const moment = _moment;

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-parable-edit',
	templateUrl: './parable-edit.component.html',
	styleUrls: ['./parable-edit.component.scss'],
	providers: [
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
	],
})
export class ParableEditComponent implements OnInit, OnDestroy {
	parable: any;
	image: any;
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	oldparable: any;
	parablesForm: FormGroup;
	hasFormErrors: boolean = false;
	headerMargin: number;
	selectedTab: number = 0;
	selectedFile: File = null;
	idParams: string;
	showModal: boolean = false;
	fSelected;
	fAudio;
	fAudioName;
	fileName;
	formError = 'Oops! Change a few things up and try submitting again.';
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private layoutUtilsService: LayoutUtilsService,
		private fb: FormBuilder,
		private parablesService: ParablesService,
	) { }

	ngOnInit() {
		console.log('init component');
		if (this.activatedRoute.snapshot.params['id']) {
			this.idParams = this.activatedRoute.snapshot.params['id'];
			this.getParableDetails(this.idParams);
		}
		this.emptyParableForm();
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		window.onload = () => {
			const style = getComputedStyle(document.getElementById('kt_header'));
			this.headerMargin = parseInt(style.height, 0);
		};
		this.loadingSubject.next(false);
	}

	getParableDetails(id) {
		console.log('start gettting org detail');
		this.parablesService.getParable(id).subscribe(parableDetails => {
			console.log('parable details full', parableDetails);
			this.parable = parableDetails['data'];
			this.initparableForm(this.parable);
			this.loadingSubject.next(false);
		});
	}

	emptyParableForm() {
		this.parablesForm = this.fb.group({
			title: ['', Validators.required],
			translation: ['', Validators.required],
			youtube: ['']
		});
	}

	initparableForm(parable: any = {}) {
		this.parablesForm = this.fb.group({
			title: [parable.title || '', Validators.required],
			translation: [parable.translation || '', Validators.required],
			youtube: [parable.youtube || '']
		});
	}

	getComponentTitle() {
		let result = '';
		if (this.idParams) {
			result = `Edit parable`;
		} else {
			result = 'Create parable';
		}
		return result;
	}

	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.parablesForm.controls;
		this.loadingSubject.next(true);
		if (this.parablesForm.invalid) {
			this.loadingSubject.next(false);
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}
		if (this.idParams) {
			let editedParable = this.parablesForm.value;
			console.log('parable to send', editedParable);
			this.updateParable();
		} else {
			this.addParable();
		}
		return;
	}

	updateParable() {
		if (this.parablesForm.get('title').value === '' || this.parablesForm.get('translation').value === '' || !this.fSelected) {
			const message = `Parable, translation and image are compulsory`;
			return this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
		}
		this.loadingSubject.next(true);
		let payload = new FormData();
		payload.append('title', this.parablesForm.get('title').value);
		payload.append('translation', this.parablesForm.get('translation').value);
		payload.append('youtube', this.parablesForm.get('youtube').value);
		if (this.fSelected) {
			payload.append('image', this.fSelected, this.fSelected.name);
		}
		if (this.fAudio) {
			payload.append('sound', this.fAudio, this.fAudio.name);
		}
		this.parablesService.updateParable(payload, this.idParams).subscribe(
			data => {
				console.log('success reponse', data);
				this.loadingSubject.next(false);
				const message = `Parable has been Successfully Updated`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				this.router.navigate(['/para/parables']);
			},
			error => {
				this.loadingSubject.next(false);
				console.log('Error response', error);
				const title = 'Please Retry';
				const message = 'Sorry, Temporary Error Occured';
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
			});
	}

	addParable() {
		if (this.parablesForm.get('title').value === '' || this.parablesForm.get('translation').value === '' || !this.fSelected) {
			const message = `Parable, translation and image are compulsory`;
			return this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
		}
		this.loadingSubject.next(true);
		let payload = new FormData();
		payload.append('title', this.parablesForm.get('title').value);
		payload.append('translation', this.parablesForm.get('translation').value);
		payload.append('youtube', this.parablesForm.get('youtube').value);
		if (this.fSelected) {
			payload.append('image', this.fSelected, this.fSelected.name);
		}
		if (this.fAudio) {
			payload.append('sound', this.fAudio, this.fAudio.name);
		}
		this.parablesService.createParable(payload).subscribe(
			data => {
				this.loadingSubject.next(false);
				console.log('success reponse', data);
				const message = `Success`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				this.router.navigate(['/para/parables']);
			}, error => {
				this.loadingSubject.next(false);
				console.log('Error response', error);
				const title = 'Please Retry';
				const message = 'Sorry, temporary error occured';
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
			});
	}

	reset() {
		this.parable = Object.assign({}, this.oldparable);
		this.emptyParableForm();
		this.hasFormErrors = false;
		this.parablesForm.markAsPristine();
		this.parablesForm.markAsUntouched();
		this.parablesForm.updateValueAndValidity();
	}

	onFileChange(event, type) {
		if (event.target.files.length > 0) {
			if (type === 'image') {
				if (event.target.files[0].size > 1048576) {
					const message = 'File too large. Image file should not be more than 1MB.';
					return this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				}
				this.fSelected = event.target.files[0];
				this.fileName = event.target.files[0].name;
			}
			if (type === 'audio') {
				if (event.target.files[0].size > 2097152) {
					const message = 'File too large. Audio file should not be more than 2MB.';
					return this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				}
				this.fAudio = event.target.files[0];
				this.fAudioName = event.target.files[0].name;
			}
		}
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	ngOnDestroy() { }

}
