import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-kcadiz',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './kcadiz.component.html',
  styleUrl: './kcadiz.component.css'
})
export class KcadizComponent {

}
