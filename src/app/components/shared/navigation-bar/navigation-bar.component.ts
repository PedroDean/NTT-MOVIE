import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonTexts } from 'src/app/helpers/LayoutTexts';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  isError: boolean | false = false;
  searchKeyword: string | undefined;

  constructor(private router: Router, private route: ActivatedRoute, public alertService: AlertService) { }

  ngOnInit(): void {
    this.setAlertMessage();
  }

  onSearchButtonClick(keyword: string) {
    this.alertService.alertMessage = '';
    this.router.navigate(['/home'], { queryParams: { search: keyword } });
  }

  onShowFavoritesButtonClick() {
    this.router.navigate(['/home'], { queryParams: { favorites: 'true' } });
    this.alertService.alertMessage = '';
  }

  setAlertMessage() {
    this.alertService.isError = false;
    this.alertService.alertMessage = CommonTexts.searchText;
  }

  goToMain() {
    this.setAlertMessage();
    this.router.navigate(['/']);
  }
}