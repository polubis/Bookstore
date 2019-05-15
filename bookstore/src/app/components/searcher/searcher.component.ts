import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';
import { Subject, Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { debounceTime, tap, filter, distinctUntilChanged } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit, OnDestroy {
  animationClass = 'searcher-wrapper searcher-not-focused';
  inputSub: Subscription;
  booksSub: Subscription;
  obs$ = new Subject<string>();
  @Input() isLoading = false;
  @Input() searcherType: 'home' | 'admin' = 'home';
  @Output() initializing = new EventEmitter<void>();
  @Output() searching = new EventEmitter<string>();

  constructor(private uiService: UserInterfaceService) { }

  ngOnInit() {
    this.inputSub = this.obs$.pipe(
      distinctUntilChanged(),
      tap(() => {
        this.initializing.emit();
      }),
      debounceTime(500)
    )
    .subscribe((searchTitle: string) => {
      this.searching.emit(searchTitle);
    });
  }

  @debounceEvent(150)
  onFocus() {
    this.animationClass = 'searcher-wrapper searcher-focused';
  }

  @debounceEvent(150)
  onBlur() {
    this.animationClass = 'searcher-wrapper searcher-not-focused';
  }

  onInput({ target }: any) {
    this.obs$.next(target.value);
  }

  ngOnDestroy() {}

}
