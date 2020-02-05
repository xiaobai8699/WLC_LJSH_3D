
### 获取鼠标当前的位置
```javascript
if ( this.domElement === document ) {
	this.mouseX = event.pageX - this.viewHalfX;
	this.mouseY = event.pageY - this.viewHalfY;

} else {
	this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
	this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;

}
```
上述代码对应的坐标系如下:
![坐标系](https://github.com/lh2lyc/WLC_LJSH_3D/blob/master/src/components/FPSControls/asset/coor.png)