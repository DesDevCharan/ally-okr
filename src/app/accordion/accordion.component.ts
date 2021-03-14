import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'okr-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  @Input() model: any;

  constructor() { }

  ngOnInit(): void {
    console.log('inp', this.model);
  }

}
