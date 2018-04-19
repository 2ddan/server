{{:it = it||_cfg.it }}
{{let filter = _cfg.filter[it.filter] }}

{{let hsl = ["hsl"] }}
{{:hsl.push(filter.h%360+360 ) }}
{{:hsl.push(filter.s/100+1) }}
{{:hsl.push(filter.b/100+1) }}
{{let bc = ["brightnessContrast"] }}
{{:bc.push(filter.bn/500) }}
{{:bc.push(filter.co/500) }}

<pi-ui-imgfilter>
    {"img":{{it.url}},"arr":{{[hsl,bc]}} }
</pi-ui-imgfilter>