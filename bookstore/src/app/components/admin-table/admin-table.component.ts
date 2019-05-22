import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';
import { PaginationWrapper } from 'src/app/models/others/PaginationWrapper';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnInit {

  @Input() isLoading: boolean;
  @Input() paginationData: PaginationWrapper<any[]>;
  @Input() columns: { key: string, name: string, sortable: boolean }[];
  @Input() selectedRowId: number;

  @Output() paginating = new EventEmitter<PageEvent>();
  @Output() rowClicking = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
