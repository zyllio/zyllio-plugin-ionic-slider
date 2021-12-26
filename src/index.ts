import { IonRange } from "@ionic/core/components/ion-range";
import { initialize } from "@ionic/core/components";

import { SliderComponent } from './slider.component'

console.log('SliderComponent: ', SliderComponent);

initialize();

customElements.define("ion-range", IonRange);
