import { Component, Input } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from "src/components/util/ng-model";
import { Tag } from "src/entity/tag";
import { ConnectionService } from "src/service";

@Component({
  providers: [MakeProvider(TagManagerComponent)],
  selector: 'bc-tag-manager',
  styleUrls: ['./tag-manager.component.scss'],
  template: `
    <ul class="tag-wrapper">
      <li *ngFor="let tag of value" class="tag">
        {{tag.name}}
        <button class="bc-button bc-button--text" (click)="removeTag(tag)" *ngIf="!readonly">
          <ion-icon name="close"></ion-icon>
        </button>
      </li>
    </ul>

    <div class="tag-input" *ngIf="!readonly">
      <ion-item>
        <ion-input name="tag_name" [(ngModel)]="input"></ion-input>
      </ion-item>
      <button class="bc-button" type="button" [disabled]="!input" (click)="addTag()">Add</button>
    </div>
  `
})
export class TagManagerComponent extends AbstractValueAccessor<Tag[]> {

  @Input() readonly: boolean;
  input: string;

  constructor(connectionService: ConnectionService) {

    super();
    this.value = [];

    connectionService.connection.then(connection => {
      connection.getRepository(Tag)
        .createQueryBuilder()
        .groupBy('name')
        .getManyAndCount()
        .then(tags => {
          console.log(tags);
        });
    });
  }

  addTag(): void {

    const tags = this.value || [];

    const tag = new Tag();
    tag.name = this.input;
    tags.push(tag);
    this.input = '';

    this.value = tags;

  }

  removeTag(tag: Tag): void {

    const idx = this.value.findIndex(item => item === tag);
    this.value.splice(idx, 1);

  }

}
