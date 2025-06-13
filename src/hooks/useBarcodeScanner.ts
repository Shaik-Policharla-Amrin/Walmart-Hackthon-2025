import { useCallback, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader, Result } from '@zxing/library';

export interface BarcodeScannerHook {
  scanBarcode: (imageData: string) => Promise<string | null>;
  isScanning: boolean;
}

export const useBarcodeScanner = (): BarcodeScannerHook => {
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const isScanningRef = useRef(false);

  useEffect(() => {
    readerRef.current = new BrowserMultiFormatReader();
    
    return () => {
      if (readerRef.current) {
        readerRef.current.reset();
      }
    };
  }, []);

  const scanBarcode = useCallback(async (imageData: string): Promise<string | null> => {
    if (!readerRef.current || isScanningRef.current) return null;

    try {
      isScanningRef.current = true;
      
      // Convert data URL to image element
      const img = new Image();
      img.src = imageData;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const result: Result = await readerRef.current.decodeFromImageElement(img);
      return result.getText();
    } catch (error) {
      // No barcode found or scanning error
      return null;
    } finally {
      isScanningRef.current = false;
    }
  }, []);

  return {
    scanBarcode,
    isScanning: isScanningRef.current
  };
};