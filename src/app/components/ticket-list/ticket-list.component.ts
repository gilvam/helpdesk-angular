import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { SharedService } from '../../services/shared.service';
import { DialogService } from '../../dialog.service';
import { Router } from '@angular/router';
import { ResponseApi } from '../model/response-api';
import { Ticket } from '../model/ticket.model';

@Component({
	selector: 'app-ticket-list',
	templateUrl: './ticket-list.component.html',
	styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

	page = 0;
	count = 5;
	pages: Array<number>;
	shared: SharedService;
	message: {};
	classCss: {};
	listTicket = [];

	ticketFilter = new Ticket();
	assignedToMe = false;

	constructor(
			private dialogService: DialogService,
			private ticketService: TicketService,
			private router: Router,
	) {
		this.shared = SharedService.getInstance();
	}

	ngOnInit() {
		this.findAll(this.page, this.count);
	}

	filter(): void {
		this.page = 0;
		this.count = 5;
		this.ticketService.findByParams(this.page, this.count, this.assignedToMe, this.ticketFilter).subscribe((responseApi: ResponseApi) => {
			this.ticketFilter.title = this.ticketFilter.title === 'uninformed' ? '' : this.ticketFilter.title;
			this.ticketFilter.number = this.ticketFilter.number === 0 ? null : this.ticketFilter.number;
			this.listTicket = responseApi['data']['content'];
			this.pages = new Array(responseApi['data']['totalPages']);
		}, err => {
			this.showMessage({
				type: 'error',
				text: err['error']['errors'][0]
			});
		});
	}

	cleanFilter(): void {
		this.assignedToMe = false;
		this.page = 0;
		this.count = 5;
		this.ticketFilter = new Ticket();
		this.findAll(this.page, this.count);
	}

	findAll(page: number, count: number) {
		this.ticketService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
			this.listTicket = responseApi['data']['content'];
			this.pages = new Array(responseApi['data']['totalPages']);
		}, err => {
			this.showMessage({
				type: 'error',
				text: err['error']['errors'][0]
			});
		});
	}

	edit(id: string) {
		this.router.navigate(['/ticket-new', id]);
	}

	detail(id: string) {
		this.router.navigate(['/ticket-detail', id]);
	}

	delete(id: string) {
		this.dialogService.confirm(' Do you want to delete the ticket ?')
		.then((candelete: boolean) => {
			if (candelete) {
				this.message = {};
				this.ticketService.delete(id).subscribe((responseApi: ResponseApi) => {
					this.showMessage({
						type: 'success',
						text: 'Record deleted'
					});
				}, err => {
					this.showMessage({
						type: 'error',
						text: err['error']['errors'][0]
					});
				});
			}
		});
	}

	setNexPage(event: any) {
		event.preventDefault();
		if (this.page + 1 < this.pages.length) {
			this.page++;
			this.findAll(this.page, this.count);
		}
	}

	setPreviousPage(event: any) {
		event.preventDefault();
		if (this.page > 0) {
			this.page--;
			this.findAll(this.page, this.count);
		}
	}

	setPage(i, event: any) {
		event.preventDefault();
		this.page = i;
		this.findAll(this.page, this.count);
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
