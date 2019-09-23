/**
 * 
 */

export interface IVNKeyWords {
    [index: string]    : string;
    tagName     : string;
    sid         : string;
    did         : string;
    offsetOld   : string;
    offset      : string;
    widget      : string;
    parent      : string;
    ext         : string;
    nodeHash    : string;
    attrHash    : string;
    attrSize    : string;
    attrs       : string;
    styleHash   : string;
    styleSize   : string;
    style       : string;
    eventHash   : string;
    eventSize   : string;
    event       : string;
    childHashMap: string;
    childHash   : string;
    wclass      : string;
    link        : string;
    children    : string;
    didMap      : string;
    textHashMap : string;
    text        : string;
    child       : string;
    childHas    : string;
    
    _$temp      : string;
    _$parent    : string;
    node        : string;
}

export const VNKeyWords: IVNKeyWords = {
    ['tagName']     : 'tg',
    ['sid']         : 'si',
    ['did']         : 'di',
    ['offsetOld']   : 'oO',
    ['offset']      : 'o',
    ['widget']      : 'w',
    ['parent']      : 'p',
    ['ext']         : 'ext',
    ['nodeHash']    : 'nH',
    ['attrHash']    : 'aH',
    ['attrSize']    : 'aS',
    ['attrs']       : 'a',
    ['styleHash']   : 'sH',
    ['styleSize']   : 'sS',
    ['style']       : 's',
    ['eventHash']   : 'eH',
    ['eventSize']   : 'eS',
    ['event']       : 'e',
    ['childHashMap']: 'cHM',
    ['childHash']   : 'cH',
    ['wclass']      : 'wc',
    ['link']        : 'l',
    ['children']    : 'cd',
    ['didMap']      : 'dM',
    ['textHashMap'] : 'tHM',
    ['text']        : 't',
    ['child']       : 'ch',
    ['childHas']    : 'cs',

    ['_$temp']      : '$t',
    ['_$parent']    : '$p',
    ['node']        : '$n'
};