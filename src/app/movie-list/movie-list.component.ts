import { Component,OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../store/movie';
import {  FormsModule } from '@angular/forms';
import {  Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  //filteredMovies: Movie[] = [];
  titleFilter: string = '';
  yearFilter: number | null = null;
  //const minBudget: number;
  //const maxBudget: number;
  currencySymbol: string = '$';
  currencyUnit: string = 'million';

  constructor(private movieService: MovieService,private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data; 
      console.log(data);
     
    });
  }
  viewDetails(movieId: number): void {
    console.log('View details for movie with ID:', movieId);
    this.router.navigate(['/movies', movieId]);
  }
  filteredMovies() {
    return this.movies.filter(movie => 
      movie.title.toLowerCase().includes(this.titleFilter.toLowerCase()) &&
      (this.yearFilter ? new Date(movie.release_date).getFullYear() === this.yearFilter : true)
    );
  }
  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }


}

