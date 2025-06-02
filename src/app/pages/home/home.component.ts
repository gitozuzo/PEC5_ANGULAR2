import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CardComponent } from '../../components/card/card.component';
import { GridComponent } from '../../components/grid/grid.component';

import { CharacterService } from '../../services/characters.service';

import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CardComponent,
    GridComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent {
  private characterService = inject(CharacterService);
  private router = inject(Router);

  characters = signal<any[]>([]);
  loading = signal(true);
  viewMode = signal<'cards' | 'table'>('cards');

  constructor() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.loading.set(true);
    this.characterService.getCharacters().subscribe({
      next: (res) => {
        this.characters.set(res.results);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  switchTo(mode: 'cards' | 'table') {
    this.viewMode.set(mode);
  }

  goToDetail(id: number) {
    this.router.navigate(['/character', id]);
  }
}
