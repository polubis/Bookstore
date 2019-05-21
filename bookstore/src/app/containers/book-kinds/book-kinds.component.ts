import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { KindsService } from 'src/app/services/KindsService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { Kind } from 'src/app/models/entities/Kind';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FormGroup, FormControl } from '@angular/forms';
import { RequestResponse } from 'src/app/models/others/RequestResponse';
import { debounceTime } from 'rxjs/operators';
import { debounceEvent } from 'src/app/helpers/debounce-decorator';

@AutoUnsubscribe()
@Component({
  selector: 'app-book-kinds',
  templateUrl: './book-kinds.component.html',
  styleUrls: ['./book-kinds.component.scss']
})
export class BookKindsComponent implements OnInit, OnDestroy {

  sub: Subscription;
  kinds: Kind[] = [];
  isLoading: boolean;

  selectedKind: Kind = { id: -1, name: '' };
  isDeleting: boolean;

  isAdding: boolean;

  kindOfBookForm = new FormGroup({
    kindOfBookName: new FormControl
  });

  isEditing: boolean;
  wantEdit: boolean;

  constructor(
    private kindsService: KindsService,
    private dialogRef: MatDialogRef<BookKindsComponent>,
    @Inject(MAT_DIALOG_DATA) public kindOfBookPayload: { id: number, name: string }
  ) { }

  ngOnInit() {
    this.sub = this.kindsService.kinds.subscribe(
      ({ data, isLoading }) => {
        this.kinds = data;
        this.isLoading = isLoading;
      }
    );
    if (this.kindOfBookPayload) {
      this.toggleWantEdit();
      this.selectedKind = this.kindOfBookPayload;
      this.kindOfBookForm.setValue({
        kindOfBookName: this.kindOfBookPayload.name
      });
    }
    this.kindsService.getKinds();
  }

  selectKind(kind: Kind) {
    if (this.wantEdit) {
      this.kindOfBookForm.setValue({
        kindOfBookName: kind.name
      });
    }
    this.selectedKind = kind;
  }

  toggleWantEdit() {
    this.wantEdit = !this.wantEdit;
  }

  toggleEditing() {
    this.kindOfBookForm.setValue({
      kindOfBookName: this.selectedKind.name
    });
    this.toggleWantEdit();
  }

  handleDeleteKind() {
    this.isDeleting = true;
    this.kindsService.deleteKind(this.selectedKind.id)
      .subscribe(
        book => {
          this.kindsService.deleteKindFromKinds(this.selectedKind.id);
          this.isDeleting = false;
          this.selectedKind = this.kinds[0] || { id: -1, name: '' };
          if (this.wantEdit) {
            this.kindOfBookForm.setValue({
              kindOfBookName: this.selectedKind.name
            });
          }
        },
        err => {
          this.isDeleting = false;
        }
      );
  }

  @debounceEvent(150)
  handleSubmit() {
    if (this.wantEdit) {
      this.handleEdit();
    } else {
      this.handleAdd();
    }
  }

  handleAdd() {
    this.isAdding = true;

    this.kindsService.addKind({
      name: this.kindOfBookForm.value.kindOfBookName
    })
      .subscribe(
        ({ successResult: kind }: RequestResponse<Kind>) => {
          this.isAdding = false;
          this.kindOfBookForm.setValue({
            kindOfBookName: ''
          });
          this.kindsService.putKindInKinds(kind);
        },
        () => {
          this.isAdding = false;
        }
      );
  }

  handleEdit() {
    this.isEditing = true;
    const kind = {
      id: this.selectedKind.id,
      name: this.kindOfBookForm.value.kindOfBookName
    };

    this.kindsService.editKind(kind)
      .subscribe(
        () => {
          this.isEditing = false;
          this.kindsService.changeKindInKinds(kind);
        },
        () => {
          this.isEditing = false;
        }
      );
  }

  ngOnDestroy() { }

}
