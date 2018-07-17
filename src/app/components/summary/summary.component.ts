import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { TicketService } from '../../services/ticket.service';
import { Summary } from '../model/summary.model';
import { ResponseApi } from '../model/response-api';

@Component({
	selector: 'app-summary',
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

	summary = new Summary();
	shared: SharedService;

	message: {};
	classCss: {};

	constructor(
			private ticketService: TicketService,
	) {
		this.shared = SharedService.getInstance();
	}

	ngOnInit() {
		this.ticketService.summary().subscribe((responseApi: ResponseApi) => {
			this.summary = responseApi.data;
		}, err => {
			this.showMessage({
				type: 'error',
				text: err['error']['errors'][0]
			});
		});
	}

	private showMessage(message: { type: string, text: string }): void {
		console.log('message: ', message);
		this.message = message;
		this.buildClasses(message.type);
		setTimeout(() => {
			this.message = undefined;
		}, 3000);
	}

	private buildClasses(type: string): void {
		this.classCss = {
			'alert': true
		};
		this.classCss['alert-' + type] = true;
	}
}
