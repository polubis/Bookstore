import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';
import { UserInterfaceService } from 'src/app/services/UserInterfaceService';
import { BooksService } from 'src/app/services/BooksService';
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
  isLoading = false;

  constructor(private uiService: UserInterfaceService, private booksService: BooksService) { }

  ngOnInit() {
    this.inputSub = this.obs$.pipe(
      filter((v: string) => v.length > 2),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
      }),
      debounceTime(500)
    )
    .subscribe((searchTitle: string) => {
      this.booksService.findBooks(
        { page: 1, pageSize: 15, searchTitle },
        () => {
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
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
