/*
 Software License Agreement (BSD License)
 http://wwwlab.cs.univie.ac.at/~a1100570/webAD/
 Copyright (c), Volodimir Begy
 All rights reserved.


 Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following condition is met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function VectorView(_model){
	this.model=_model;
	this.scale=1;
}

VectorView.prototype.initStage=function(cont){
	this.stage = new Kinetic.Stage({
  		container: cont,
  		draggable: true,
		width: 0,
		height: 0
	}); 
}

VectorView.prototype.zoomIn=function(){
	if(this.scale<3)this.scale=this.scale+0.1;
	this.draw();
}

VectorView.prototype.zoomOut=function(){
	if(this.scale>0.2)this.scale=this.scale-0.1;
	this.draw();
}

VectorView.prototype.draw=function(){
	
	var w=this.model.size()*30*this.scale+20*this.scale;
	var biggestNum=0;
	for(var i=0;i<this.model.size();i++){
		if(this.model.elements[i].value>biggestNum)
			biggestNum=this.model.elements[i].value;
	}
	var h=(45+biggestNum*3)*this.scale;
	
	this.stage.setHeight(h);
	this.stage.setWidth(w);
	this.stage.removeChildren();

	var layer = new Kinetic.Layer();
	if(this.model.range==undefined){this.stage.removeChildren();return;}
	var range=this.model.range.split("-");
	
	for(var i=this.model.size()-1;i>-1;i--){
		var rect = new Kinetic.Rect({
			x: 10+(i*25*this.scale),
			y: 20*this.scale,
			width: 15*this.scale,
			height: (5+this.model.elements[i].value*3)*this.scale,
			stroke: this.model.elements[i].color,
			fill: this.model.elements[i].color,
			strokeWidth: 2*this.scale,
		});
		
		var lTxt="L";
		var rTxt="R";
		if(this.model.l==this.model.r){
			lTxt="L/R";
			rTxt="";
		}
		
		var pivotText="P";
		if(range[0]==range[1]){
			pivotText="P/L/R";
			lTxt="";
		}
		else if(i==this.model.pivot && i==this.model.r){
			pivotText="P/R";
			rTxt="";
		}
		else if(i==this.model.pivot && i==this.model.l){
			pivotText="P/L";
			lTxt="";
		}
		
		var pivot = new Kinetic.Text({
			x: rect.getX()-7*this.scale,
			y: rect.getY()+rect.getHeight()+10*this.scale,
			text: pivotText,
			fontSize: 12*this.scale,
			fontFamily: 'Calibri',
			fill: 'black',
			width: 30*this.scale,
			align: 'center'
		});
		
		var L = new Kinetic.Text({
			x: rect.getX()-7*this.scale,
			y: rect.getY()+rect.getHeight()+10*this.scale,
			text: lTxt,
			fontSize: 12*this.scale,
			fontFamily: 'Calibri',
			fill: 'black',
			width: 30*this.scale,
			align: 'center'
		});
		
		var R = new Kinetic.Text({
			x: rect.getX()-7*this.scale,
			y: rect.getY()+rect.getHeight()+10*this.scale,
			text: rTxt,
			fontSize: 12*this.scale,
			fontFamily: 'Calibri',
			fill: 'black',
			width: 30*this.scale,
			align: 'center'
		});
	  
		var text = new Kinetic.Text({
			x: rect.getX()-8*this.scale,
			y: rect.getY()-15*this.scale,
			text: this.model.elements[i].value,
			fontSize: 15*this.scale,
			fontFamily: 'Calibri',
			fill: 'black',
			width: 30*this.scale,
			align: 'center'
		});
		
		if(this.model.pivot==i){
			layer.add(pivot);
		}
		if(this.model.l==i){
			layer.add(L);
		}
		if(this.model.r==i){
			layer.add(R);
		}
		layer.add(rect);
		layer.add(text);
	}
	this.stage.add(layer);
	
}