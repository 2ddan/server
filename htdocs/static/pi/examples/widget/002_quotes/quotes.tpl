{{: tt = {"name":"aaa"} }}
<div>		
	<widget w-tag="child$">{"child":"tangmin{{tt.name.replace('aaa','bbb')}}"}</widget>
	<div style= "background-color:{{tt.name === 'aaa' ? 'blue' : 'red'}} ">xxxx</div>
	<div style="color: white">{{tt.name}}</div>
</div>