import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	public shared: SharedService;

	constructor() {
		this.shared = SharedService.getInstance();
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let authRequest: any;

		if (this.shared.isLoggedIn()) {
			authRequest = req.clone({
				setHeaders: {
					'Authorization': this.shared.token
				}
			});
			return next.handle(authRequest);
		}

		return next.handle(req);
	}
}
