import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './ui/components/navbar/navbar.component';
import { FooterComponent } from './ui/components/footer/footer.component';
import { GridLayoutComponent } from './ui/components/grid-layout/grid-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
           NavbarComponent,
           FooterComponent,
           GridLayoutComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'My-Project';
}
