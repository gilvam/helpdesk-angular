import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	private showTemplate: boolean;
	public shared: SharedService;

	constructor() {
		this.shared = SharedService.getInstance();
		this.showTemplate = false;
	}

	ngOnInit() {
		this.shared.showTemplate.subscribe(show => this.showTemplate = show);
	}

	showContentWrapper() {
		return {
			'content-wrapper': this.shared.isLoggedIn()
		};
	}

}
