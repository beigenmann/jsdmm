export interface TransferResult {
    data: any;
}

export interface UsbDevice extends EventTarget {
    configuration: any;
    transferIn(endpoint: number, bytes: number): Promise<TransferResult>;
    open(): Promise<void>;
    selectConfiguration(configNumber: number): Promise<void>;
    claimInterface(interfaceNumber: number): Promise<void>;
    controlTransferOut(obj: any): Promise<void>;
    transferOut(interfaceNumber: number, data: any): Promise<void>;
    close(): Promise<void>;
}

export interface Usb extends EventTarget {
    getDevices(): Promise<UsbDevice[]>;
    requestDevice(filter: USBDeviceRequestOptions): Promise<UsbDevice>;
}

export interface Navigator {
    usb: Usb;
}

export interface USBDeviceFilter {
    vendorId?: number;
    productId?: number;
    classCode?: number;
    subclassCode?: number;
    protocolCode?: number;
    serialnumber?: string;
}

export interface USBDeviceRequestOptions {
    filters: Array<USBDeviceFilter>;
}

export interface USBDirection {
}

export interface USBControlTransferParameters {
}

export interface USBInTransferResult {
}

export interface USBOutTransferResult {
}

export interface USBIsochronousInTransferResult {
}

export interface USBIsochronousOutTransferResult {
}

export interface USBControlTransferParameters {
}


declare global {
    interface Navigator {
        usb: Usb;
    }
}
