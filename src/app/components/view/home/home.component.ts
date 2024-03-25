import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MOVIE } from 'src/app/models/Movie';
import { AlertService } from 'src/app/services/alert.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchKeyword!: string;
  loading = true;
  movies: MOVIE[] = [];
  expand!: boolean;
  detailsVisibility: { [movieId: string]: boolean } = {};
  movieInfo: any;

  favoriteMovies: string[] = [];
  navigationBar: any;

  constructor(private sharedService: SharedService, public alertService: AlertService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.alertService.alertMessage = '';
    this.loadFavoriteMovies();

    this.route.queryParams.subscribe((params) => {
      this.loading = true;
      this.searchKeyword = params['search'];
      const isFavorites = params['favorites'];
      if (isFavorites && isFavorites === 'true') {
        this.showFavoriteMovies();
        if (this.favoriteMovies.length === 0) {
          this.alertService.isError = true;
          this.alertService.alertMessage = 'No favorites yet!';
        }
      } else {
        this.loadMovies();
      }
    });
  }

  loadFavoriteMovies() {
    const favoriteMoviesStr = localStorage.getItem('favoriteMovies');
    if (favoriteMoviesStr) {
      this.favoriteMovies = JSON.parse(favoriteMoviesStr);
    }
  }

  loadMovies() {
    this.sharedService.searchMovies(this.searchKeyword).subscribe(res => {
      this.movies = res.Search as MOVIE[];
      this.loading = false;
      if (res.Response == 'False') {
        this.alertService.isError = true;
        this.alertService.alertMessage = res.Error;
      }
    });
  }

  getMovieInfo(id: string): void {
    this.sharedService.getMovieDetails(id).subscribe(res => {
      this.movieInfo = res as MOVIE;
      this.detailsVisibility[id] = false;
      this.toggleDetails(id);
    });
  }

  toggleDetails(movieId: string): void {
    this.detailsVisibility[movieId] = !this.detailsVisibility[movieId];
  }

  hideInfo(movieId: string): void {
    this.detailsVisibility[movieId] = false;
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    const index = this.favoriteMovies.indexOf(movieId);
    if (index === -1) {
      this.favoriteMovies.push(movieId);
    } else {
      this.favoriteMovies.splice(index, 1);
    }
    localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies));
  }
  
  showFavoriteMovies(): void {
    this.movies = []
    this.favoriteMovies.forEach(movieId => {
      this.sharedService.getMovieDetails(movieId).subscribe(res => {
        const movieDetails = res as MOVIE;
        this.movies.push(movieDetails);
      });
    });

    this.loading = false;
  }
}