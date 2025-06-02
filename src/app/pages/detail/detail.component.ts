import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../services/characters.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private characterService = inject(CharacterService);

  character: any = null;
  showDetails = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.characterService.getCharacterById(+id).subscribe({
        next: (data) => {
          this.character = {
            ...data,
            favoriteQuote: 'Wubba Lubba Dub-Dub!',
            powerLevel: Math.floor(Math.random() * 100),
          };
        },
        error: (err) => {
          console.error('Error loading character:', err);
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
