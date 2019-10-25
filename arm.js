class Arm
{
  constructor(parent,angle,speed,length,color)
  {
    this.parent = parent;
    this.ang = angle;
    this.spd = speed;
    this.len = length;
    if(color == "")this.clr = "rgba(255,255,255,0)";
    else this.clr = color;
	if(this.clr == "rainbow")this.hue = 0;
    this.pos = [0,0];
    this.prv = [0,0];
  }

  update()
  {
    this.ang += this.spd;
    this.prv[0] = this.pos[0];
    this.prv[1] = this.pos[1];
    this.pos[0] = this.parent.pos[0] + Math.cos(this.ang/180*Math.PI)*this.len;
    this.pos[1] = this.parent.pos[1] + Math.sin(this.ang/180*Math.PI)*this.len;
    if(this.prv[0]!=0)this.draw();
  }

  draw()
  {
    c.beginPath();
    c.moveTo(this.prv[0],this.prv[1]);
    c.lineTo(this.pos[0],this.pos[1]);
    if(this.clr == "rainbow")
	{
	  c.strokeStyle = "hsl("+this.hue+",100%,50%)";
	  this.hue += 1;
	}
	else
	{
	  c.strokeStyle = this.clr;
	}
    c.stroke();
  }
}
