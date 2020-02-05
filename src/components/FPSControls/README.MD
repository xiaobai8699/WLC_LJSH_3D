
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