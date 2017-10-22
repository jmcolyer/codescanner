import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	scanData: {};
	encodeData: string ;
	encodedData: {} ;
	options: BarcodeScannerOptions;

	constructor(public alertCtrl: AlertController, private barcodeScanner: BarcodeScanner) {

	}

	scan(){
		this.options = {
			prompt : "Scan your barcode "
		}
		this.barcodeScanner.scan(this.options).then((barcodeData) => {
			console.log(barcodeData);
			this.scanData = barcodeData;
		}, (err) => {
			console.log("Error occured : " + err);
			this.presentAlert(JSON.stringify(err));
		});         
	}

	encodeText(){
		this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData).then((encodedData) => {
			console.log(encodedData);
			this.encodedData = encodedData;
			//this.presentAlert(JSON.stringify(encodedData));
		}, (err) => {
			console.log("Error occured : " + err);
			this.presentAlert(JSON.stringify(err));
		});                 
	}

	presentAlert(message) {
		const alert = this.alertCtrl.create({
			title: 'Encoded data',
			subTitle: message,
			buttons: ['Dismiss']
		});
		alert.present();
	}

}

