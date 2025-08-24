import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-ksevilla',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './ksevilla.component.html',
  styleUrl: './ksevilla.component.css'
})
export class KsevillaComponent {

}
