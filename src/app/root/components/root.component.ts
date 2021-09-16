import {Component, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {Title as TitleService} from "@angular/platform-browser";
import {LocalisationService} from "@lib/localisation/localisation.service";
import {LocalisationLanguages} from "@lib/localisation/localisation-language.enum";

@Component({
  selector: 'sv-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit{
  constructor(private localisationService: LocalisationService,
              private translateService: TranslateService,
              private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.translateService.instant('root.title'));
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.titleService.setTitle(this.translateService.instant('root.title'));
    });
  }

  toggleLanguage () {
    if (this.localisationService.localeId === LocalisationLanguages.Dutch) {
      this.localisationService.useLanguage(LocalisationLanguages.English).then(r => {});
    } else {
      this.localisationService.useLanguage(LocalisationLanguages.Dutch).then(r => {});;
    }
  }
}
