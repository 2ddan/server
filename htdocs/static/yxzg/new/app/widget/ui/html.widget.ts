import { widgetRegister } from '../../../pi/gui_virtual/util';

import './html.tpl';
import './html';

widgetRegister('app-widget-ui-html', {"tpl":"./html.tpl","widget":"./html.ts"});
