import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, AfterViewInit {
  @ViewChild('links', { static: true }) links!: ElementRef<HTMLDivElement>;
  @ViewChildren('navLink') navLinks!: QueryList<ElementRef<HTMLAnchorElement>>;

  isLight = false;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private router: Router
  ) {}

  ngOnInit() {
    const stored = this.doc.defaultView?.localStorage.getItem('gs-theme');
    if (stored === 'light' || stored === 'dark') {
      this.setTheme(stored === 'light', false);
    }
  }

  ngAfterViewInit() {
    this.navLinks.changes.subscribe(() => this.queueIndicatorUpdate());
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.queueIndicatorUpdate();
    });
    this.queueIndicatorUpdate();
  }

  @HostListener('window:resize')
  onResize() {
    this.queueIndicatorUpdate();
  }

  toggleTheme() {
    this.setTheme(!this.isLight, true);
  }

  private setTheme(isLight: boolean, persist: boolean) {
    this.isLight = isLight;
    this.doc.body.classList.toggle('light', isLight);
    if (persist) {
      this.doc.defaultView?.localStorage.setItem('gs-theme', isLight ? 'light' : 'dark');
    }
  }

  private queueIndicatorUpdate() {
    this.doc.defaultView?.requestAnimationFrame(() => this.updateIndicator());
  }

  private updateIndicator() {
    const linksEl = this.links?.nativeElement;
    if (!linksEl || !this.navLinks?.length) {
      return;
    }
    const activeLink = this.navLinks.find((link) => link.nativeElement.classList.contains('active'));
    if (!activeLink) {
      return;
    }
    const el = activeLink.nativeElement;
    linksEl.style.setProperty('--slide-left', `${el.offsetLeft}px`);
    linksEl.style.setProperty('--slide-top', `${el.offsetTop}px`);
    linksEl.style.setProperty('--slide-width', `${el.offsetWidth}px`);
    linksEl.style.setProperty('--slide-height', `${el.offsetHeight}px`);
    linksEl.classList.add('has-slider');
  }
}