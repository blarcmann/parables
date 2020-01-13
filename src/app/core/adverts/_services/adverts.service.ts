import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService } from '../../_base/crud';

// Model
import { environment } from '../../../../environments/environment';

// url
const BASE_URL = environment.BASE_URL;

@Injectable()
export class AdvertsService {
	userToken = localStorage.getItem('userToken');
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	getAllAdverts(skip, limit): Observable<any> {
		const userToken = localStorage.getItem('userToken');
		return this.http.get<any>(`${BASE_URL}/showcase`, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			},
			params: {
				count: limit,
				skip: skip
			}
		});
	}

	countAdverts(): Observable<any[]> {
		const userToken = localStorage.getItem('userToken');
		return this.http.get<any[]>(`${BASE_URL}/showcase/count`, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}

	getAdvert(id): Observable<any> {
		const userToken = localStorage.getItem('userToken');
		return this.http.get<any>(`${BASE_URL}/showcase/${id}`, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}

	// creates new contacts
	createAdvert(ad): Observable<any> {
		const userToken = localStorage.getItem('userToken');
		return this.http.post<any>(`${BASE_URL}/showcase`, ad, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}

	updateAdvert(ad: any, id) {
		const userToken = localStorage.getItem('userToken');
		return this.http.put<any>(`${BASE_URL}/showcase/${id}`, ad, {
			headers: {
				'Authorization': 'Bearer ' + userToken,
			}
		});
	}

	changeStatus(status, id) {
		const userToken = localStorage.getItem('userToken');
		return this.http.put<any>(`${BASE_URL}/showcase/status/${id}`, status, {
			headers: {
				'Authorization': 'Bearer ' + userToken,
			}
		});
	}


	// update a contact
	// delete a contact
	deleteAdvert(id): Observable<any> {
		const userToken = localStorage.getItem('userToken');
		return this.http.delete<any>(`${BASE_URL}/showcase/${id}`, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}
}
