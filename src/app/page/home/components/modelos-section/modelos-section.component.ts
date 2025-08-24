import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modelos-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modelos-section.component.html',
  styleUrl: './modelos-section.component.css'
})
export class ModelosSectionComponent {
  constructor(private sanitizer: DomSanitizer) {}

  videos = [
    {
      id: 'yyyKVSZUoO8',
      thumbnail: `https://img.youtube.com/vi/yyyKVSZUoO8/maxresdefault.jpg`
    },
    {
      id: '8Vnoc0OawNE', 
      thumbnail: `https://img.youtube.com/vi/8Vnoc0OawNE/maxresdefault.jpg`
    },
    {
      id: '08YIqLUJqG0',
      thumbnail: `https://img.youtube.com/vi/08YIqLUJqG0/maxresdefault.jpg`
    }
  ];

  selectedVideo: string | null = null;

  openVideo(videoId: string) {
    this.selectedVideo = videoId;
  }

  closeVideo() {
    this.selectedVideo = null;
  }

  getVideoUrl(): SafeResourceUrl {
    if (this.selectedVideo) {
      const url = `https://www.youtube.com/embed/${this.selectedVideo}?autoplay=1`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return '';
  }
}
