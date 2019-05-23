import { Component, OnInit } from '@angular/core';
import { StatsService } from './StatsService';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor(private statsService: StatsService, private uiService: UserInterfaceService) { }

  stats: any;

  ngOnInit() {
    this.uiService.isLoadingOnAdmin.next(true);
    this.statsService.getStats()
      .subscribe(
        stats => {
          this.uiService.isLoadingOnAdmin.next(false);
        },
        err => {
          this.uiService.isLoadingOnAdmin.next(false);
        }
      );
  }

}
