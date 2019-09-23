import { widgetRegister } from '../gui_virtual/util';

import './html.tpl';
import './html';

widgetRegister('pi-gui_ui-html', {"tpl":"./html.tpl","widget":"./html.ts","forelet":"./html.ts"});
