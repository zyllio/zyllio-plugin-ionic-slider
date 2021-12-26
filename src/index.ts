import { IonRange } from "@ionic/core/components/ion-range";
import { initialize } from "@ionic/core/components";

import { SliderComponent } from './slider.component'

// Prevent Treeshaking
console.debug(SliderComponent);

initialize();

if(!customElements.get("ion-range")) {
  customElements.define("ion-range", IonRange);
}
