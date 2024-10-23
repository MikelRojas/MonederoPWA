declare module 'react-qr-reader' {
    import { Component } from 'react';
  
    interface QrReaderProps {
      delay?: number;
      onError: (error: Error) => void;
      onScan: (data: string | null) => void;
      facingMode?: 'user' | 'environment' | 'left' | 'right';
    }
  
    export default class QrReader extends Component<QrReaderProps> {}
  }
  