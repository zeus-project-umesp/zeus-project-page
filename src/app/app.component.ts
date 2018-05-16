import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public navIsFixed = false;
  public closeResult: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private modalService: NgbModal) {}

  @HostListener('window:scroll', []) onWindowScroll() {
    const number = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (number > 600) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && number < 600) {
      this.navIsFixed = false;
    }
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
