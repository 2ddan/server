import { widgetRegister } from '../../../pi/gui_virtual/util';

import './repeat.tpl';
import './repeat';

widgetRegister('app-widget-repeat-repeat', {"tpl":"./repeat.tpl","cfg":"./repeat.cfg","widget":"./repeat.ts"});
