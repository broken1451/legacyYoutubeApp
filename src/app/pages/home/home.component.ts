import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { Video, YoutubeResponse } from '../../models/youtube.interface';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public videos: Video[] = [];


  constructor(private youtubeService: YoutubeService) { 
    // youtube api key: AIzaSyAnJwIt5t_BrWQkcWebasjI9Z0Rj6brLzo
    // uploados / playlist fernando : UUuaPTYj15JSkETGnEseaFFg
  }

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos() {
    this.youtubeService.getVideos().subscribe(resp => {
      this.videos.push(...resp.items.map(video => video.snippet));
      // this.videos = resp.items.map(video => video.snippet);
      console.log(this.videos);
    })
  }

  showVideo(video: Video) {
    console.log (video);
    Swal.fire({
      html: `
          <h4>${video.title}</h4>
         <hr/>
         <iframe 
           width="100%" 
           height="315" 
           src="https://www.youtube.com/embed/${video.resourceId.videoId}" 
           title="YouTube video player" frameborder="0" 
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
          </iframe>
      `
    });
  }
}
