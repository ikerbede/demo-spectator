import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DudeCardComponent } from './dude-card/dude-card.component';
import { Dude } from './shared/dude.model';
import { DudesService } from './shared/dudes.service';

@Component({
  selector: 'iker-root',
  standalone: true,
  imports: [CommonModule, DudeCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  dudes: readonly Dude[] = [];

  constructor(private readonly dudesService: DudesService) {}

  ngOnInit(): void {
    this.dudes = this.dudesService.getDudes();
  }
}
