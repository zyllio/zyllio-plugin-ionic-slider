/// <reference types="@zyllio/zy-sdk" />

import { SliderMetadata } from "./slider.metadata";

console.log('Plugin Slider started')

const CssContent = `
  :host {
    overflow: hidden;
  }

  .content {
    height: 100%; 
  }

  .ion-color-secondary {
    font-family: 'Roboto';
    --ion-color-base: var(--ion-color-secondary, #3dc2ff)!important;
    --ion-color-base-rgb: var(--ion-color-secondary-rgb, 61, 194, 255)!important;
    --ion-color-contrast: var(--ion-color-secondary-contrast, #fff)!important;
    --ion-color-contrast-rgb: var(--ion-color-secondary-contrast-rgb, 255, 255, 255)!important;
    --ion-color-shade: var(--ion-color-secondary-shade, #36abe0)!important;
    --ion-color-tint: var(--ion-color-secondary-tint, #50c8ff)!important;
  }

`;

// snaps="true" step="10"

const HtmlContent = `
  <ion-range min="0" max="100" pin="true" color="secondary">
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

    this.refresh();

    const propertyValue = zySdk.services.factory.getPropertyValue(this, 'value')

    zySdk.services.dictionary.onChange(propertyValue, () => {
      this.refresh()
    })

    const slider = this.shadow.querySelector('ion-range')

    slider!.addEventListener('ionChange', (event: Event) => {

      const value = (event as CustomEvent).detail.value

      zySdk.services.dictionary.setValue(propertyValue, value)
    })

  }

  static get observedAttributes() {
    return ['data-value'];
  }

  attributeChangedCallback() {
    this.refresh()
  }

  refresh() {

    setTimeout( () => {
      
      const propertyValue = zySdk.services.factory.getPropertyValue(this, 'value')
  
      let value = zySdk.services.dictionary.getValue(propertyValue)
  
      if (value === undefined) {
        value = 0
      }
  
      const slider = this.shadow.querySelector('ion-range')
  
      if(slider) {
        slider.value = value
      }
    })

  }
}

zySdk.services.registry.registerComponent(SliderMetadata, SliderComponent, false)