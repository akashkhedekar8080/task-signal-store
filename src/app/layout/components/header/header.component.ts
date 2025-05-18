import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {}
