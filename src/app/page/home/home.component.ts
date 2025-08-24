import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeroCarouselComponent } from "./components/hero-carousel/hero-carousel.component";
import { UbicacionesSectionComponent } from "./components/ubicaciones-section/ubicaciones-section.component";
import { KdaySectionComponent } from "./components/kday-section/kday-section.component";
import { TallerSectionComponent } from "./components/taller-section/taller-section.component";
import { EquipokawaSectionComponent } from "./components/equipokawa-section/equipokawa-section.component";
import { Foto360SectionComponent } from "./components/foto360-section/foto360-section.component";
import { ModelosSectionComponent } from "./components/modelos-section/modelos-section.component";
import { RedesSocialesSectionComponent } from "./components/redes-sociales-section/redes-sociales-section.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, HeroCarouselComponent, UbicacionesSectionComponent, KdaySectionComponent, TallerSectionComponent, EquipokawaSectionComponent, Foto360SectionComponent, ModelosSectionComponent, RedesSocialesSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('HomeComponent inicializado');
  }

  ngOnDestroy(): void {
    // Ya no hay intervalos que limpiar en el componente home
  }
}