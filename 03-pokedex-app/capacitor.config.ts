import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: '03-pokedex-app',
  webDir: 'www',
  plugins:{
    CapacitorHttp:{
      enabled: true
    }
  }
};

export default config;
