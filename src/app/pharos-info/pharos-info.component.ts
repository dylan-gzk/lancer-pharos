import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pharos-info',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pharos-info.component.html',
  styleUrl: './pharos-info.component.less',
})
export class PharosInfoComponent { }
