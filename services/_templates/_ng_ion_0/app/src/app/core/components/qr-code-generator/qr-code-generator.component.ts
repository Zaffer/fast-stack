import { Component, ElementRef, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import qrcodegen from 'nayuki-qr-code-generator';

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.component.html',
  styleUrls: ['./qr-code-generator.component.scss'],
})

export class QrCodeGeneratorComponent implements OnInit {

  @ViewChild('qrCanvas', {static: true}) qrCanvas: ElementRef<HTMLCanvasElement>;

  @Input() url: string = window.location.href;

  QRC = qrcodegen.QrCode;
  qrCode: qrcodegen.QrCode;

  constructor() { }

  ngOnInit() {
    // console.log(this.qrCanvas);
    this.qrCode = this.QRC.encodeText(this.url, this.QRC.Ecc.MEDIUM);
    this.qrCodeCanvas(this.qrCode, 10, 2, "#fff", "#000", this.qrCanvas.nativeElement);
  }

  qrCodeCanvas(qr, scale, border, lightColor, darkColor, canvas) {
    if (scale <= 0 || border < 0)
			throw "Value out of range";
		const width = (qr.size + border * 2) * scale;
		canvas.width = width;
		canvas.height = width;
		let ctx = canvas.getContext("2d");
		for (let y = -border; y < qr.size + border; y++) {
			for (let x = -border; x < qr.size + border; x++) {
				ctx.fillStyle = qr.getModule(x, y) ? darkColor : lightColor;
				ctx.fillRect((x + border) * scale, (y + border) * scale, scale, scale);
			}
		}
  }
}

