import { Component, AfterViewInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-redes-sociales-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './redes-sociales-section.component.html',
  styleUrl: './redes-sociales-section.component.css'
})
export class RedesSocialesSectionComponent implements AfterViewInit {
  
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit() {
    // Cargar el script de Instagram
    this.loadInstagramScript();
  }

  private loadInstagramScript() {
    const script = this.renderer.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    this.renderer.appendChild(this.document.body, script);
  }
}

