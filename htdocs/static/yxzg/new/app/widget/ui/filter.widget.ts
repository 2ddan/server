import { widgetRegister } from '../../../pi/gui_virtual/util';

import './filter.tpl';
import './filter';

widgetRegister('app-widget-ui-filter', {"tpl":"./filter.tpl","widget":"./filter.ts"});
