import { Component, OnInit, ElementRef } from '@angular/core';
import { AdminOrdersService } from './AdminOrdersService';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';
import { PaginationWrapper } from 'src/app/models/others/PaginationWrapper';
import { RequestResponse } from 'src/app/models/others/RequestResponse';
import { AdminOrder, AdminOrderTable, AdminSlimOrder, OrderStatus } from './models';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  statuses = {
    'Przyjęty do realizacji': 1,
    'Oczekuje na przyjęcie do realizacji': 2,
    'Zamówienie zrealizowane': 3
  };

  statusesKeys = Object.keys(this.statuses);

  orders: PaginationWrapper<AdminSlimOrder>;
  columns: AdminOrderTable[] = [
    { key: 'id', name: 'Identyfikator' },
    { key: 'totalPrice', name: 'Koszt zamówienia' },
    { key: 'orderItemsCount', name: 'Liczba książek' },
    { key: 'statusName', name: 'Status zamówienia' },
    { key: 'purchaser', name: 'Zamawiający' }
  ];

  selectedOrderInfo: AdminSlimOrder & { statusId: number };

  constructor(
    private adminOrdersService: AdminOrdersService,
    private uiService: UserInterfaceService
  ) { }

  ngOnInit() {
    this.handleGetAllOrders({ page: 1, pageSize: 15 });
  }

  handleGetAllOrders(payload: { page: number, pageSize: number }) {
    this.uiService.isLoadingOnAdmin.next(true);
    this.adminOrdersService.getAllOrders(payload)
      .subscribe(
        ({ successResult: ordersData }: RequestResponse<PaginationWrapper<AdminOrder>>) => {
          this.uiService.isLoadingOnAdmin.next(false);
          this.orders = {
            ...ordersData,
            results: ordersData.results.map(({ id, user, totalPrice, status, purchasedBooks }) => {
              return {
                id, purchaser: `${user.firstName} ${user.lastName}`, totalPrice,
                statusName: status.statusName, orderItemsCount: purchasedBooks.length
              } as any;
            })
          };
        },
        error => {
          this.uiService.isLoadingOnAdmin.next(false);
        }
      );
  }

  paginationChanged(data: PageEvent) {
    this.handleGetAllOrders({
      page: data.pageIndex + 1,
      pageSize: data.pageSize
    });
    this.selectedOrderInfo = undefined;
  }

  onTableRowClick(order: AdminSlimOrder) {
    this.selectedOrderInfo = { ...order, statusId: this.statuses[order.statusName] };
  }

  handleStatusChange(statusId: number, statusName: string) {
    if (statusId !== this.selectedOrderInfo.statusId) {
      this.orders = {
        ...this.orders,
        results: this.orders.results.map(result => {
          return result.id === this.selectedOrderInfo.id ?
            { ...result, statusName } : result;
        })
      };
      this.selectedOrderInfo = { ...this.selectedOrderInfo, statusId };
      this.adminOrdersService.changeOrderStatus(this.selectedOrderInfo.id, statusId).subscribe();
    }
  }
}
