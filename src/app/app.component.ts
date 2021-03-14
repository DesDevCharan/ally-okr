import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'okr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ally-okr';
  data = null;
  model = null;
  filteredModel = null;
  filters = null;
  selectedCats = [];
  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.apiService.getOKR().subscribe((res: any) => {
      this.data = res?.data;
      this.prepareModel();
    });
  }

  prepareModel(): void {
    const model = this.data?.filter((item) => item.parent_objective_id === '')
      .map((md) => {
        md.children = [];
        return md;
      });
    this.data?.forEach(item => {
      const obj = model.find(md => md.id === item.parent_objective_id);
      if (obj) {
        obj.children.push(item);
      }
    });
    this.model = model;
    this.prepareFilters();
  }

  prepareFilters(): void {
    this.filters = this.model.map(md => md.category).filter((v, i, a) => a.indexOf(v) === i);
    this.flushModel();
  }

  onCategoryClick(category): void {
    const idx = this.selectedCats.includes(category);
    if (!idx) {
      this.selectedCats.push(category);
    }
    this.flushModel();
  }

  onClickDelete(category): void {
    const idx = this.selectedCats.indexOf(category);
    this.selectedCats.splice(idx, 1);
    this.flushModel();
  }

  flushModel(): void {
    if (this.selectedCats.length) {
      this.filteredModel = this.model.filter(md => this.selectedCats.indexOf(md.category) !== -1);
    } else {
      this.filteredModel = this.model;
    }
  }
}
