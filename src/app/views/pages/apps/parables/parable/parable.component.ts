// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { ParablesService } from '../../../../../core/parables';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-parable',
	templateUrl: './parable.component.html',
	styleUrls: ['./parable.component.scss']
})
export class ParableComponent implements OnInit, OnDestroy {
	loading$: Observable<boolean>;
	loadingSubject = new BehaviorSubject<boolean>(true);
	claimRoles;
	users = [];
	allUsers;
	roleSelect = true;
	hodsUsers;
	currentHOD = 0;
	selected = 'parable';
	parableDetails;
	hasFormErrors: boolean = false;
	turnoverForm: FormGroup;
	turnover;
	idParams;
	constructor(
		private layoutUtilsService: LayoutUtilsService,
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private parablesService: ParablesService,
		private _location: Location,
		private router: Router) { }

	ngOnInit() {
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		this.getparableDetails();
	}

	getparableDetails() {
		console.log('start gettting org detail');
		this.idParams = this.activatedRoute.snapshot.params['id'];
		this.parablesService.getParable(this.idParams).subscribe(parableDetails => {
			console.log('parable details full', parableDetails);
			this.parableDetails = parableDetails['data'];
			this.loadingSubject.next(false);
		});
	}

	goBack() {
		this._location.back();
	}

	onDelete() {
		const _title: string = 'Delete parable';
		const _description: string = 'Are you sure to permanently delete this parable?';
		const _waitDesciption: string = 'Parable will be deleting...';
		const _deleteMessage = `Parable has been deleted`;
		const _errorDelete = 'Seems and Error Occured, Retry';

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			console.log(res);
			if (!res) {
				return;
			}
			this.parablesService.deleteParable(this.idParams).subscribe(
				deleted => {
					console.log('deleted', deleted);
					this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
					this.router.navigate(['/para/parables']);
				},
				error => {
					console.log('error', error);
					this.layoutUtilsService.showActionNotification(_errorDelete, MessageType.Delete);
				}
			);
		});
	}

	ngOnDestroy() { }
}
