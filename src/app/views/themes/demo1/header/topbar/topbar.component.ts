// Angular
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../core/users';

@Component({
	selector: 'kt-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
	userId = '';
	userDetails;
	constructor(
		private usersService: UserService
	) { }
	ngOnInit() {
		this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
		this.userId = localStorage.getItem('userId');
		this.getUserDetails(this.userId);
	}
	getUserDetails(id) {
		this.usersService.getUserById(id).subscribe(
			singleUser => {
				let usrr = singleUser['data'];
				this.userDetails = usrr[0];
			},
			error => {
				console.log('error occured', error);
			}
		);
	}
}
