import { widgetRegister } from '../../../pi/gui_virtual/util';

import './input.tpl';
import './input';

widgetRegister('app-widget-ui-input', {"tpl":"./input.tpl","widget":"./input.ts"});
