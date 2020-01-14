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

	changeStatus() {
		let status  = false;
		if (this.advertDetails.active === true) {
			status = false;
		} else {
			status = true;
		}
		const payload = {status};
		this.advertsService.changeStatus(payload, this.advertId).subscribe(
			response => {
				this.layoutUtilsService.showActionNotification('Successful', MessageType.Update);
				this.getAdvert(this.advertId);
				this.loadingSubject.next(false);
			}
		);
	}

	onDelete() {
		if (this.route.snapshot.params['media'] === 'facebook') {
			localStorage.setItem('facebookDetails', '');
			return this.router.navigate(['/cdash/adverts/adverts']);
		}
		const _title: string = 'Delete Advert';
		const _description: string = 'Are you sure to permanently delete the advert?';
		const _waitDesciption: string = 'Advert will be deleted...';
		const _deleteMessage = `Advert has been deleted`;
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
