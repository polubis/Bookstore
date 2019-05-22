import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/ApiService';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  constructor(private apiService: ApiService) {
  }

  generateReport() {
    return this.apiService.execute('reports/generate', 'get');
  }
}
