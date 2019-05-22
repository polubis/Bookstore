import { Component, OnInit } from '@angular/core';
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

  readonly orderStatuses: OrderStatus[] = [
    {
      id: 1,
      name: 'Oczekujące'
    },
    {
      id: 2,
      name: 'W trakcie realizacji'
    },
    {
      id: 3,
      name: 'Zrealizowane'
    }
  ];

  selectedRowInfo: {
    status: OrderStatus;
    id: number;
  } = { status: null, id: - 1 };

  orders: PaginationWrapper<AdminSlimOrder>;
  columns: AdminOrderTable[] = [
    { key: 'id', name: 'Identyfikator' },
    { key: 'totalPrice', name: 'Koszt zamówienia' },
    { key: 'orderItemsCount', name: 'Liczba książek' },
    { key: 'statusName', name: 'Status zamówienia' },
    { key: 'purchaser', name: 'Zamawiający' }
  ];

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
  }

  changeStatus(status: OrderStatus) {
    console.log(status);
  }
}
