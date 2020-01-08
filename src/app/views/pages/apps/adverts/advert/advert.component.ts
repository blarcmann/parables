import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertsService } from '../../../../../core/adverts';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { Location } from '@angular/common';


@Component({
	selector: 'kt-advert',
	templateUrl: './advert.component.html',
	styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit {
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	proceedingOption: string;
	advertId: string;
	advertDetails: any;
	constructor(
		private route: ActivatedRoute,
		private advertsService: AdvertsService,
		private _location: Location,
		private layoutUtilsService: LayoutUtilsService,
		private router: Router) { }

	ngOnInit() {
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		this.advertId = this.route.snapshot.params['id'];
		this.getAdvert(this.advertId);
		this.loadingSubject.next(false);
	}

	getAdvert(id) {
		this.loadingSubject.next(true);
		this.advertsService.getAdvert(id).subscribe(
			advertDetail => {
				this.advertDetails = advertDetail['data'];
				this.loadingSubject.next(false);
			}
		);
	}

	goBack() {
		this._location.back();
	}

	onDelete() {
		if (this.route.snapshot.params['media'] === 'facebook') {
			localStorage.setItem('facebookDetails', '');
			return this.router.navigate(['/cdash/adverts/adverts']);
		}
		const _title: string = 'Delete ADs';
		const _description: string = 'Are you sure to permanently delete the ADs?';
		const _waitDesciption: string = 'ADs will be deleted...';
		const _deleteMessage = `ADs has been deleted`;
		const _errorDelete = 'Seems and Error Occured, Retry';

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			console.log(res);
			if (!res) {
				return;
			}
			this.advertsService.deleteAdvert(this.advertId).subscribe(
				deleted => {
					console.log('deleted', deleted);
					this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
					this.router.navigate(['/cdash/adverts/adverts']);
				},
				error => {
					console.log('error', error);
					this.layoutUtilsService.showActionNotification(_errorDelete, MessageType.Delete);
				}
			);
		});
	}
}
