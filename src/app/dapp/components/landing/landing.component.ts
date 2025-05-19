import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzCardModule,
    NzTypographyModule,
    NzDividerModule,
    NzAvatarModule
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  teamMembers = [
    {
      name: 'Ana García',
      role: 'CEO & Fundadora',
      bio: 'Experta en blockchain con más de 8 años de experiencia en fintech.',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg'
    },
    {
      name: 'Carlos Rodríguez',
      role: 'CTO',
      bio: 'Desarrollador blockchain senior, especializado en smart contracts y seguridad.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    },
    {
      name: 'Laura Martínez',
      role: 'Diseñadora UX',
      bio: 'Apasionada por crear experiencias de usuario intuitivas y accesibles.',
      image: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg'
    }
  ];

  features = [
    {
      icon: 'safety',
      title: 'Seguridad Avanzada',
      description: 'Protección de última generación para tus activos digitales.'
    },
    {
      icon: 'thunderbolt',
      title: 'Transacciones Instantáneas',
      description: 'Envía y recibe cripto en segundos.'
    },
    {
      icon: 'interaction',
      title: 'Multi-Chain',
      description: 'Soporte para múltiples blockchains.'
    },
    {
      icon: 'dollar',
      title: 'Gestión de Gastos',
      description: 'Seguimiento detallado de tus transacciones.'
    }
  ];
}