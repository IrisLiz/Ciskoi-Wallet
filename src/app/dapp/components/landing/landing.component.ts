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
    name: 'Lizbet Arias',
    role: 'Estudiante de Valle Grande',
    bio: 'Experta en ver animes con más de 2 años de experiencia claro que si!!.',
    image: 'https://i.pinimg.com/736x/84/78/89/847889c1088a7c7b1802f93eac962236.jpg',
    social: {
      github: 'https://github.com/lizbetarias',
      instagram: 'https://instagram.com/lizbetarias'
    }
  },
  {
    name: 'Juan Condori',
    role: 'Docente de Valle Grande',
    bio: 'Apasionada por crear experiencias de usuario intuitivas y accesibles.',
    image: 'https://scontent.flim19-1.fna.fbcdn.net/v/t39.30808-6/428628545_2721617214661138_3314904875312608193_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF9P4Bir0EDA7EJ1XHxkSdHbCETTGA5E_VsIRNMYDkT9efmMPJUDlI15SR8z1XR5_BSqLTwLaRKSFiRRNsdZ_GP&_nc_ohc=k7KX-xZ1PfkQ7kNvwHZ8nAY&_nc_oc=AdmA0f9nQO7EmEFOFpMuTd9NIw3bKLvqEPgDhjVcnMWHjiHnl8Tkz_t1YxPz7zlSnlc&_nc_zt=23&_nc_ht=scontent.flim19-1.fna&_nc_gid=UkA2gQXLqvIWNojuJNp_yQ&oh=00_AfL2Cy9kkudTj51hPSwbGQ0Lk0v2ZQGQNCUPCqhI6Yf8Zw&oe=68307D07',
    social: {
      github: 'https://github.com/juancondori',
      instagram: 'https://instagram.com/juancondori'
    }
  },
  {
    name: 'Elser Lazaro',
    role: 'Estudiante de Valle Grande',
    bio: 'Apasionada por crear experiencias de usuario intuitivas y accesibles.',
    image: 'https://scontent.flim19-1.fna.fbcdn.net/v/t1.6435-9/197216700_3753378988100952_7481183708118712528_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHMUi2VtNtg1JhVin_RSI5xHz41M6HysTkfPjUzofKxOdG_11luSdm-f_hdJ9KNpYeY1QY8WMzFZ7LNqbf3mmEH&_nc_ohc=Q3Xh_BCVQqMQ7kNvwEAQzdW&_nc_oc=Adm1vF_jfq9W1QVSf8Sof1NNCXXt-NjDlwoP83Sdmj7E_zJseKbhd3mY6MKNpRMIaiw&_nc_zt=23&_nc_ht=scontent.flim19-1.fna&_nc_gid=xC1ZS8tD96vlUzDUY5-rmQ&oh=00_AfKmOZDq0YTEyY5FpJT1JR8RzWZVhp1fTmHKtBtIBD6fJg&oe=6852220E',
    social: {
      github: 'https://github.com/elserlazaro',
      instagram: 'https://instagram.com/elserlazaro'
    }
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