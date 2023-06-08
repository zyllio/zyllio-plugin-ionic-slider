import { ComponentMetadataModel } from "@zyllio/zy-sdk";

const IconData = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24" fill="#cccccc">    
    <path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M9,12.44V9A2,2 0 0,1 11,7A2,2 0 0,1 13,9V12.44C14.19,11.75 15,10.47 15,9A4,4 0 0,0 11,5A4,4 0 0,0 7,9C7,10.47 7.81,11.75 9,12.44Z" />
  </svg>
`;

export const SliderMetadata: ComponentMetadataModel = {
  id: 'custom-slider',
  icon: IconData,
  label: 'Slider',
  category: 'Plugins',
  subCategory: 'Sliders',
  hidden: false,
  properties: [{
    id: 'value',
    name: 'Value',
    type: 'number',
    tootip: 'The value between 1 and 100',
    default: '50',
    main: true,
    write: true
  }, {
    id: 'snap',
    name: 'Snap',
    type: 'boolean',
    tootip: 'Snap the values',
    default: 'true'
  }, {
    id: 'step',
    name: 'Step',
    type: 'number',
    tootip: 'Step',
    default: '10'
  }],
  styles: [{
    id: '--color',
    name: 'Color',
    type: 'color',
    default: '#ffffff'
  }]
}