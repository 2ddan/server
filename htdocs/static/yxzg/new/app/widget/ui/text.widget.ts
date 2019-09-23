import { widgetRegister } from '../../../pi/gui_virtual/util';

import './text.tpl';
import './text';

widgetRegister('app-widget-ui-text', {"tpl":"./text.tpl","widget":"./text.ts"});
