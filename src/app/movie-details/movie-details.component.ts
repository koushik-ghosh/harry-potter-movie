import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../store/movie';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent  {
  movieDetails!: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router:Router
  ) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieById(movieId).subscribe(details => {
        console.log(details);
        this.movieDetails = details;
      });
    }
  }
  isNumeric(value: string | number): boolean {
    return (typeof value === 'number' || (typeof value === 'string' && value.trim() !== '')) 
      && !isNaN(Number(value)) && isFinite(Number(value));
  }
  
  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }
  backHome(): void {
    this.router.navigate(['./movies']);
  }

}

