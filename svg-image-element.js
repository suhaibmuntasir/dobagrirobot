jvm.SVGImageElement = function(config, style){
    jvm.SVGImageElement.parentClass.call(this, 'image', config, style);
  };
  
  jvm.inherits(jvm.SVGImageElement, jvm.SVGShapeElement);
  
  jvm.SVGImageElement.prototype.applyAttr = function(attr, value){
    var that = this,
        imageOffset,
        imageUrl;
  
    if (attr == 'image') {
      if (typeof value == 'object') {
        imageUrl = value.url;
        this.offset = value.offset;
      } else {
        imageUrl = value;
        this.offset = [0, 0];
      }
  
      jvm.whenImageLoaded(imageUrl).then(function(img){
        that.node.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imageUrl);
        that.width = img[0].width;
        that.height = img[0].height;
        that.applyAttr('width', that.width);
        that.applyAttr('height', that.height);
  
        that.applyAttr('x', that.cx - that.width / 2 + that.offset[0]);
        that.applyAttr('y', that.cy - that.height / 2 + that.offset[1]);
  
        jvm.$(that.node).trigger('imageloaded', [img]);
      });
    } else if(attr == 'cx') {
      this.cx = value;
      if (this.width) {
        this.applyAttr('x', value - this.width / 2 + this.offset[0]);
      }
    } else if(attr == 'cy') {
      this.cy = value;
      if (this.height) {
        this.applyAttr('y', value - this.height / 2 + this.offset[1]);
      }
    } else {
      jvm.SVGImageElement.parentClass.prototype.applyAttr.apply(this, arguments);
    }
  };