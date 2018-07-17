import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { User } from '../model/user.model';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	shared: SharedService;

	constructor() {
		this.shared = SharedService.getInstance();
		console.log('this.shared: ', this.shared);
		// this.shared.user = new User();
	}

	ngOnInit() {
	}

	signOut(): void {
		this.shared.token = null;
		this.shared.user = null;
		window.location.href = '/login';
		window.location.reload();
	}

}
