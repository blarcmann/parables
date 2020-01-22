// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { AdvertsService } from '../../../../../core/adverts';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
// CRUD
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { MatDialog } from '@angular/material';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { Location } from '@angular/common';

// url

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-advert-edit',
	templateUrl: './advert-edit.component.html',
	styleUrls: ['./advert-edit.component.scss']
})
export class AdvertEditComponent implements OnInit, OnDestroy {
	advert;
	image: any;
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	advertForm: FormGroup;
	hasFormErrors: boolean = false;
	headerMargin: number;
	selectedTab: number = 0;
	idParams: string;
	title = '';
	link = '';
	fs;
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		public dialog: MatDialog,
		private _location: Location,
		private layoutUtilsService: LayoutUtilsService,
		private layoutConfigService: LayoutConfigService,
		private fb: FormBuilder,
		private advertsService: AdvertsService
	) { }

	ngOnInit() {
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		if (this.activatedRoute.snapshot.params['id']) {
			this.idParams = this.activatedRoute.snapshot.params['id'];
			this.getAdvertDetails();
		}
		window.onload = () => {
			const style = getComputedStyle(document.getElementById('kt_header'));
			this.headerMargin = parseInt(style.height, 0);
		};
		this.loadingSubject.next(false);
	}

	goBack() {
		this._location.back();
	}

	getAdvertDetails() {
		this.loadingSubject.next(true);
		this.advertsService.getAdvert(this.idParams).subscribe(advertDetails => {
			this.advert = advertDetails['data'];
			this.title = this.advert.title;
			this.link = this.advert.link;
			this.loadingSubject.next(false);
		});
	}


	getComponentTitle() {
		let result = 'Please Wait';
		if (!this.advert || !this.advert.code) {
			result = 'Add advert';
			return result;
		}
		result = `Edit advert`;
		return result;
	}

	onSubmit() {
		this.hasFormErrors = false;
		this.loadingSubject.next(true);
		/** check form */
		if (this.advert) {
			this.updateAdvert();
			return;
		}
		this.addAdvert();
	}


	addAdvert() {
		this.loadingSubject.next(true);
		if (this.link === '' || this.title === '' || !this.fs) {
			const message = 'All fields are compulsory';
			this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
		}
		let payload = new FormData();
		payload.append('title', this.title);
		payload.append('link', this.link);
		payload.append('image', this.fs, this.fs.name);
		this.advertsService.createAdvert(payload).subscribe(
			data => {
				this.loadingSubject.next(false);
				console.log('success reponse', data);
				const message = `Advert has been Successfully added`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				this.router.navigate(['/para/adverts/adverts']);
			}, error => {
				this.loadingSubject.next(false);
				console.log('Error response', error);
				const title = 'Please Retry';
				const message = 'Sorry, Temporary Error Occured';
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
			});
	}

	updateAdvert() {
		this.loadingSubject.next(true);
		if (this.link === '' || this.title === '') {
			const message = 'Title and link are compulsory';
			this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
		}
		let payload = new FormData();
		payload.append('title', this.title);
		payload.append('link', this.link);
		if (this.fs) {
			payload.append('image', this.fs, this.fs.name);
		}
		this.advertsService.updateAdvert(payload, this.idParams).subscribe(
			data => {
				console.log('success reponse', data);
				this.loadingSubject.next(false);
				const message = `Updated Successfully`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				this.router.navigate(['/para/adverts/adverts']);
			},
			error => {
				this.loadingSubject.next(false);
				console.log('Error response', error);
				const title = 'Please Retry';
				const message = 'Sorry, Temporary Error Occured';
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
			});
	}

	onFileChange(event) {
		this.fs = event.target.files[0];
	}


	reset() {
		this.title = '';
		this.link = '';
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	ngOnDestroy() { }

}
