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
export class ParablesService {
	userToken = localStorage.getItem('userToken');
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }


	// creates new Parables
	createParable(parable): Observable<any> {
		const userToken = localStorage.getItem('userToken');
		return this.http.post<any>(`${BASE_URL}/parable`, parable, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}

	// get all Parables
	getParables(skip, limit): Observable<any[]> {
		const userToken = localStorage.getItem('userToken');
		return this.http.get<any[]>(`${BASE_URL}/parable`, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			},
			params: {
				count: limit,
				skip: skip
			}
		});
	}

	getParable(id): Observable<any[]> {
		const userToken = localStorage.getItem('userToken');
		return this.http.get<any[]>(`${BASE_URL}/parable/${id}`, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}

	getParablesCount(): Observable<any[]> {
		const userToken = localStorage.getItem('userToken');
		return this.http.get<any[]>(`${BASE_URL}/parable/count`, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}

	// update a parable
	updateParable(parable: any, parableId: string) {
		const userToken = localStorage.getItem('userToken');
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put<any>(`${BASE_URL}/parable/${parableId}`, parable, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}

	// delete a parable
	deleteParable(parableId: string): Observable<any> {
		const userToken = localStorage.getItem('userToken');
		return this.http.delete<any>(`${BASE_URL}/api/parable?parable_id=${parableId}`, {
			headers: {
				'Authorization': 'Bearer ' + userToken
			}
		});
	}

}
