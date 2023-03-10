import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonFavoriteComponent } from '../button-favorite/button-favorite.component';
import { Dude } from '../shared/dude.model';
import { DudesService } from '../shared/dudes.service';

@Component({
  selector: 'iker-dude-card',
  standalone: true,
  imports: [CommonModule, ButtonFavoriteComponent],
  templateUrl: './dude-card.component.html',
  styleUrls: ['./dude-card.component.scss'],
})
export class DudeCardComponent implements OnInit {
  @Input() dude!: Dude;
  isFavorite = false;

  constructor(private readonly dudesService: DudesService) {}

  ngOnInit() {
    this.isFavorite = this.dudesService.isFavorite(this.dude.name);
  }

  changeFavorite(): void {
    if (this.isFavorite) {
      this.dudesService.removeFavorite(this.dude.name);
    } else {
      this.dudesService.addFavorite(this.dude.name);
    }
    this.isFavorite = !this.isFavorite;
  }
}
