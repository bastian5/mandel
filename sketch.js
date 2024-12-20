
let d
let von
let bis

function setup() {
  createCanvas(windowHeight, windowHeight);
  pixelDensity(1)
  loadPixels()
  von = createVector(-2,-1.5)
  bis = createVector(1, 1.5)
  noLoop()
  draw()
  //frameRate(1)
}

function draw() {
  background(50);
  for (let x=0; x<width; x++) {
    for (let y=0; y<height; y++) {
      let c = createVector(map(x, 0,width, von.x, bis.x), 
                           map(y, 0,height, von.y, bis.y))
      let n = 0
      let z = createVector(0,0)
      for(let i=0; i<100; i++) {
        z = complexsquare(z).add(c)
        if(abs(z.x+z.y) > i*100+16) {
          n = i
          break
        }
      }
      n=sqrt(n)
      let upper = 10
      pixels[(x+width*y)*4]   = map(n*2, 0, upper, 10,150)
      pixels[(x+width*y)*4+1] = map(n*3, 0, upper, 5, 150)
      pixels[(x+width*y)*4+2] = map(n*4, 0, upper, 10,150)
      pixels[(x+width*y)*4+3] = 255
    }
  }
  updatePixels()
  print(von.x, bis.x, von.y, bis.y)
  print(mouseX, mouseY)
  strokeWeight(10)
  stroke(255)
  //point(200,200)
}

function complexsquare(z) {
  let c = createVector(z.x*z.x-z.y*z.y,2*z.x*z.y)
  return c
}
  
function mouseClicked() {
  //if (key === 'z') {
    //print(von.x)
    let zoom = 2
    let sizex = bis.x - von.x
    let sizey = bis.y - von.y
    von.x += sizex/(2*zoom)
    bis.x -= sizex/(2*zoom)
    von.y += sizey/(2*zoom)
    bis.y -= sizey/(2*zoom)
  
    sizex = bis.x - von.x
    sizey = bis.y - von.y
    von.x+= map(-(width/2)+mouseX, -width/2, width/2, -sizex/2, sizex/2)
    bis.x+= map(-(width/2)+mouseX, -width/2, width/2, -sizex/2, sizex/2)
    von.y+= map(-(height/2)+mouseY, -height/2, height/2, -sizey/2, sizey/2)
    bis.y+= map(-(height/2)+mouseY, -height/2, height/2, -sizey/2, sizey/2)
    draw()
    
}
  
function keyPressed() {
  if(key=='r') {
    von = createVector(-2,-1.5)
    bis = createVector(1, 1.5)
    draw()
  }
}