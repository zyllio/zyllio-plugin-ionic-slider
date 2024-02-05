import { SliderMetadata } from "./slider.metadata";

console.log('Plugin Slider started')

const CssContent = `

  :host {
    overflow: hidden;
    width: 100%;
    height: 100px;
    padding: 10px;
    box-sizing: border-box;
  }

  .content {
    height: 100%; 
  }

  .ion-color-secondary {
    font-family: 'Roboto';
    --ion-color-base-rgb: var(--ion-color-secondary-rgb, 61, 194, 255) !important;
    --ion-color-contrast: var(--ion-color-secondary-contrast, #fff) !important;
    --ion-color-contrast-rgb: var(--ion-color-secondary-contrast-rgb, 255, 255, 255) !important;
    --ion-color-shade: var(--ion-color-secondary-shade, #36abe0) !important;
    --ion-color-tint: var(--ion-color-secondary-tint, #50c8ff) !important;
    --knob-background: var(--color) !important;
    
    --ion-color-base: var(--theme-secondary-color) !important;
    --ion-color-primary: var(--theme-tertiary-color)  !important;
    --bar-background: var(--theme-tertiary-color) !important;
    --ion-text-color: var(--theme-text-color) !important;
  }

`;

export class SliderComponent extends HTMLElement {

  shadow: ShadowRoot

  htmlElement: HTMLElement

  styleElement: HTMLElement

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'content';
    this.styleElement = document.createElement('style');
  }

  connectedCallback() {

    this.shadow.appendChild(this.styleElement);
    this.shadow.appendChild(this.htmlElement);

    this.styleElement.innerHTML = CssContent;

    this.refresh()

    setTimeout(() => this.init())
  }

  static get observedAttributes() {
    return ['value', 'snap', 'step'];
  }

  attributeChangedCallback() {
    this.refresh()
  }

  getHtmlTemplate() {

    const snaps = this.getAttribute('snaps')

    const step = this.getAttribute('step')

    const value = this.getAttribute('value')

    return `
      <ion-range mode="ios" min="0" max="100" pin="true" color="secondary" ticks="true" step="${step}" snaps="${snaps}" value="${value}">
      </ion-range>`
  }

  refresh() {
    this.htmlElement.innerHTML = this.getHtmlTemplate()
  }

  init() {

    const slider = this.shadow.querySelector('ion-range')

    slider!.addEventListener('ionChange', (event: Event) => {

      const value = (event as CustomEvent).detail.value

      this.dispatchEvent(new CustomEvent("changed", { detail: { value: value } }))

      // zySdk.services.dictionary.setValue(propertyValue, value)
    })

  }

}

zySdk.services.registry.registerComponent(SliderMetadata, SliderComponent)