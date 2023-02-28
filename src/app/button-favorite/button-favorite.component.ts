import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'iker-button-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-favorite.component.html',
  styleUrls: ['./button-favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFavoriteComponent {
  @Input() isFavorite = false;
  @Input() disabled = false;
  @Output() changeFavorite = new EventEmitter<boolean>();

  onClick(): void {
    this.changeFavorite.emit(!this.isFavorite);
  }
}
