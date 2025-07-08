import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

declare let window: any;

interface NetworkConfig {
  chainId: string;
  chainName: string;
  displayName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
  color: string;
  icon: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzMessageModule,
    NzSpinModule,
    NzDividerModule,
    NzTypographyModule,
    NzSelectModule,
    NzTagModule,
    NzAlertModule,
    NzSwitchModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  isMetaMaskConnected = false;
  walletAddress: string = '';
  currentNetwork: string = '';
  selectedNetworkId: string = '0x4268'; // Holesky por defecto
  rememberNetwork: boolean = false;
  connectionError: string = '';

  // Configuración de redes soportadas
  supportedNetworks: NetworkConfig[] = [
    {
      chainId: '0x4268', // 17000 en decimal
      chainName: 'Holesky',
      displayName: 'Holesky Testnet',
      nativeCurrency: {
        name: 'Holesky Ether',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: ['https://ethereum-holesky.publicnode.com'],
      blockExplorerUrls: ['https://holesky.etherscan.io/'],
      color: '#627EEA',
      icon: 'ethereum'
    },
    {
      chainId: '0xaa36a7', // 11155111 en decimal
      chainName: 'Sepolia',
      displayName: 'Sepolia Testnet',
      nativeCurrency: {
        name: 'Sepolia Ether',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: ['https://sepolia.infura.io/v3/'],
      blockExplorerUrls: ['https://sepolia.etherscan.io/'],
      color: '#FF6B35',
      icon: 'experiment'
    },
    {
      chainId: '0x1', // 1 en decimal
      chainName: 'Ethereum',
      displayName: 'Ethereum Mainnet',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: ['https://mainnet.infura.io/v3/'],
      blockExplorerUrls: ['https://etherscan.io/'],
      color: '#627EEA',
      icon: 'ethereum'
    }
  ];

  constructor(
    private fb: FormBuilder, 
    private message: NzMessageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadSavedPreferences();
    this.checkExistingConnection();
  }

  // Cargar preferencias guardadas
  private loadSavedPreferences(): void {
    const savedNetwork = localStorage.getItem('preferred-network');
    const rememberPref = localStorage.getItem('remember-network');
    
    if (savedNetwork && rememberPref === 'true') {
      this.selectedNetworkId = savedNetwork;
      this.rememberNetwork = true;
    }
  }

  // Guardar preferencias
  private savePreferences(): void {
    if (this.rememberNetwork) {
      localStorage.setItem('preferred-network', this.selectedNetworkId);
      localStorage.setItem('remember-network', 'true');
    } else {
      localStorage.removeItem('preferred-network');
      localStorage.removeItem('remember-network');
    }
  }

  // Obtener información de la red seleccionada
  getSelectedNetwork(): NetworkConfig | undefined {
    return this.supportedNetworks.find(network => network.chainId === this.selectedNetworkId);
  }

  // Verificar si ya existe conexión previa con MetaMask
  async checkExistingConnection(): Promise<void> {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts'
        });
        
        if (accounts && accounts.length > 0) {
          this.walletAddress = accounts[0];
          await this.getCurrentNetwork();
          this.isMetaMaskConnected = true;
          
          this.setupEthereumListeners();
          
          setTimeout(() => {
            this.router.navigate(['wallet']);
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error al verificar conexión existente:', error);
    }
  }

  // Obtener la red actual
  async getCurrentNetwork(): Promise<void> {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const network = this.supportedNetworks.find(net => net.chainId === chainId);
      this.currentNetwork = network ? network.displayName : `Red desconocida (${chainId})`;
    } catch (error) {
      console.error('Error al obtener la red actual:', error);
      this.currentNetwork = 'Red desconocida';
    }
  }

  // Configurar listeners de eventos de Ethereum
  setupEthereumListeners(): void {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          this.disconnectMetaMask();
        } else {
          this.walletAddress = accounts[0];
        }
      });
      
      window.ethereum.on('chainChanged', (chainId: string) => {
        this.getCurrentNetwork();
        window.location.reload();
      });
    }
  }

  // Cambiar a la red seleccionada
  async switchToSelectedNetwork(): Promise<boolean> {
    const network = this.getSelectedNetwork();
    if (!network) {
      this.message.error('Red no válida seleccionada');
      return false;
    }

    try {
      // Intentar cambiar a la red
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.chainId }],
      });
      
      this.message.success(`Cambiado a ${network.displayName}`);
      return true;
    } catch (switchError: any) {
      // Si la red no está agregada, intentar agregarla
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: network.chainId,
              chainName: network.chainName,
              nativeCurrency: network.nativeCurrency,
              rpcUrls: network.rpcUrls,
              blockExplorerUrls: network.blockExplorerUrls,
            }],
          });
          
          this.message.success(`Red ${network.displayName} agregada y seleccionada`);
          return true;
        } catch (addError: any) {
          this.message.error(`Error al agregar la red: ${addError.message}`);
          return false;
        }
      } else {
        this.message.error(`Error al cambiar de red: ${switchError.message}`);
        return false;
      }
    }
  }

  // Conectar con MetaMask
  async connectMetaMask(): Promise<void> {
    this.isLoading = true;
    this.connectionError = '';

    try {
      if (typeof window.ethereum === 'undefined') {
        this.connectionError = 'MetaMask no está instalado. Por favor instala MetaMask para continuar.';
        this.message.error(this.connectionError);
        this.isLoading = false;
        return;
      }

      // Primero cambiar a la red seleccionada
      const networkSwitched = await this.switchToSelectedNetwork();
      if (!networkSwitched) {
        this.isLoading = false;
        return;
      }

      // Solicitar acceso a las cuentas
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length === 0) {
        this.connectionError = 'No se encontraron cuentas o se denegó el permiso.';
        this.message.error(this.connectionError);
        this.isLoading = false;
        return;
      }
      
      this.walletAddress = accounts[0];
      await this.getCurrentNetwork();
      this.isMetaMaskConnected = true;
      
      // Guardar preferencias
      this.savePreferences();
      
      this.message.success(`¡Conectado correctamente a ${this.currentNetwork}!`);
      
      this.setupEthereumListeners();
      
      setTimeout(() => {
        this.router.navigate(['wallet']);
      }, 1500);
    } catch (error: any) {
      this.connectionError = error.message || 'Error al conectar con MetaMask';
      this.message.error(this.connectionError);
    } finally {
      this.isLoading = false;
    }
  }

  // Desconectar MetaMask
  disconnectMetaMask(): void {
    this.isMetaMaskConnected = false;
    this.walletAddress = '';
    this.currentNetwork = '';
    this.connectionError = '';
    this.message.info('Desconectado de MetaMask');
  }

  // Cambiar red seleccionada
  onNetworkChange(chainId: string): void {
    this.selectedNetworkId = chainId;
    if (this.rememberNetwork) {
      this.savePreferences();
    }
  }

  // Cambiar preferencia de recordar red
  onRememberNetworkChange(remember: boolean): void {
    this.rememberNetwork = remember;
    this.savePreferences();
  }
}