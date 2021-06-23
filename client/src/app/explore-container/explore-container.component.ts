import { Component, OnInit, Input } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  private imgSrc = 'assets/images/add-heart.svg';

  constructor() { }

  ngOnInit() {}

  public exportPdf(urls) {
    // // left, top, width, height

    // const imgData = 'assets/images/Screenshot.png';
    //     const pdf = new jsPDF('p', 'mm', 'a4');
    //     const imgProps= pdf.getImageProperties(imgData);
    //     const pdfWidth = pdf.internal.pageSize.getWidth();
    //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //     pdf.save('download.pdf');

    const image = 'assets/images/image.png';
    const doc = new jsPDF('p', 'px', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const widthRatio = pageWidth / 2170;
    const heightRatio = pageHeight / 1610;
    const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

    const canvasWidth = 2170 * ratio;
    const canvasHeight = 1610 * ratio;

    const marginX = (pageWidth - canvasWidth) / 2;
    const marginY = (pageHeight - canvasHeight) / 2;

    doc.addImage(image, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);
    // doc.output('dataurlnewwindow');
    doc.save('download.pdf');
}

  public onChange($event){
    console.log($event, 'onchange')
    const img = new Image();
    img.onload = () => {
        const width = img.width;
        const height = img.height;
        console.log(width, 'width');
        console.log(height, 'height');
    };
    // console.log(img.width, 'height');

    img.src = 'assets/images/Screenshot.png';

}
}
