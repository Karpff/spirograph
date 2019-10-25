var canvas = document.getElementById("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext('2d');

var praArm = {pos:[innerWidth/2,innerHeight/2]};
var arms1 = [];
var arms2 = [];
var arms3 = [];
var stopped = false;
var background = "#222222";

function getV(x)
{
  return document.getElementById(x).value;
}

function init()
{
  arms1 = [];
  arms2 = [];
  arms3 = [];
  for(let i=0;i<config.arm1.number;i++)
  {
    var st = new Arm(praArm,(360/config.arm1.number)*i,config.arm1.speed,config.arm1.length,config.arm1.color)
    arms1.push(st);
    for(let j=0;j<config.arm2.number;j++)
    {
      var nd = new Arm(st,(360/config.arm2.number)*j,config.arm2.speed,config.arm2.length,config.arm2.color)
      arms2.push(nd);
      for(let k=0;k<config.arm3.number;k++)
      {
        var rd = new Arm(nd,(360/config.arm3.number)*k,config.arm3.speed,config.arm3.length,config.arm3.color)
        arms3.push(rd);
      }
    }
  }
  stopped = false;
  document.getElementById("stopButton").innerHTML = "Stop!";
  clr();
}

function run()
{
  if(!isNaN(getV("stAmount"))&&!isNaN(getV("stSpeed"))&&!isNaN(getV("stLength"))
  &&!isNaN(getV("ndAmount"))&&!isNaN(getV("ndSpeed"))&&!isNaN(getV("ndLength"))
  &&!isNaN(getV("ndAmount"))&&!isNaN(getV("ndSpeed"))&&!isNaN(getV("ndLength")))
  {
    config.arm1 =
    {
      number: parseInt(getV("stAmount")),
      speed: parseInt(getV("stSpeed")),
      length: parseInt(getV("stLength")),
      color: getV("stColor")
    };
    config.arm2 =
    {
      number: parseInt(getV("ndAmount")),
      speed: parseInt(getV("ndSpeed")),
      length: parseInt(getV("ndLength")),
      color: getV("ndColor")
    };
    config.arm3 =
    {
      number: parseInt(getV("rdAmount")),
      speed: parseInt(getV("rdSpeed")),
      length: parseInt(getV("rdLength")),
      color: getV("rdColor")
    };
    background = getV("bg");
  }
  init();
}

function randomize()
{
  config.arm1 =
  {
    number: parseInt(Math.random()*5)+1,
    speed: parseInt(Math.random()*6-3),
    length: parseInt(Math.random()*200),
    color: ""
  };
  config.arm2 =
  {
    number: parseInt(Math.random()*5)+1,
    speed: parseInt(Math.random()*10-5),
    length: parseInt(Math.random()*200),
    color: "red"
  };
  config.arm3 =
  {
    number: parseInt(Math.random()*5),
    speed: parseInt(Math.random()*10-5),
    length: parseInt(Math.random()*200),
    color: "cyan"
  };
  init();
}

function stop()
{
  if(stopped)
  {
    stopped = false;
    document.getElementById("stopButton").innerHTML = "Stop!";
  }
  else
  {
    stopped = true;
    document.getElementById("stopButton").innerHTML = "Start!";
  }
}

function clr()
{
  c.fillStyle = background;
  c.fillRect(0,0,canvas.width,canvas.height);
}

function seedGen()
{
  let c = config;
  let seed = c.arm1.number+","+c.arm1.speed+","+c.arm1.length+","+c.arm1.color+";";
  if(!isNaN(c.arm2.number))
  {
    seed += c.arm2.number+","+c.arm2.speed+","+c.arm2.length+","+c.arm2.color+";";
    if(!isNaN(c.arm3.number))
    {
      seed += c.arm3.number+","+c.arm3.speed+","+c.arm3.length+","+c.arm3.color+";";
    }
    else
    {
      seed += ";";
    }
  }
  else
  {
    seed += ";;";
  }
  seed += background+";";
  alert(seed);
}

function seedRun()
{
  var props = ["number","speed","length","color"];
  var seed = prompt("Paste your seed here:");
  var arm = 1;
  var prop = 0;
  var current = "";
  for(let i=0;i<seed.length;i++)
  {
    if(seed.charAt(i) == ";")
    {
      if(arm == 4)
      {
        background = current;
      }
      else
      {
        config["arm"+arm][props[prop]] = current;
        current = "";
        arm++;
        prop = 0;
      }
    }
    else if(seed.charAt(i) == ",")
    {
      config["arm"+arm][props[prop]] = parseInt(current);
      current = "";
      prop++;
    }
    else
    {
      current += seed.charAt(i);
    }
  }
  init();
}

function animate()
{
  if(!stopped)
  {
    for(let i=0;i<arms1.length;i++)
    {
      arms1[i].update();
    }
    for(let i=0;i<arms2.length;i++)
    {
      arms2[i].update();
    }
    for(let i=0;i<arms3.length;i++)
    {
      arms3[i].update();
    }
  }
  window.requestAnimationFrame(animate);
}
init();
animate();
