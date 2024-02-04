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

  :host-context(body[editor]) .content {
    pointer-events: none;
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

const HtmlContent = `
22

  <ion-range mode="ios" min="0" max="100" pin="true" color="secondary">
  </ion-range>
`

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
    this.htmlElement.innerHTML = HtmlContent
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

  init() {

    // const propertyValue = zySdk.services.component.getPropertyValue(this, 'value')

    // zySdk.services.dictionary.onChange(propertyValue, () => {
    //   this.refresh()
    // })

    const slider = this.shadow.querySelector('ion-range')

    slider!.addEventListener('ionChange', (event: Event) => {

      const value = (event as CustomEvent).detail.value

      // zySdk.services.dictionary.setValue(propertyValue, value)
    })

  }

  refresh() {

    let value = this.getAttribute('value')

    const slider = this.shadow.querySelector('ion-range')

    if (slider) {

      slider.value = (value === undefined) ? parseInt(value) : 0

      const snap = this.getAttribute('snap')

      slider.setAttribute('snaps', snap!)

      const step = this.getAttribute('step')

      slider.setAttribute('step', step!)

      slider.setAttribute('ticks', 'true')
    }
  }
}

zySdk.services.registry.registerComponent(SliderMetadata, SliderComponent)