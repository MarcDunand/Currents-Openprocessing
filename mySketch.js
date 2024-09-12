var gridN = 10;
var scribbleLen = 1000
var vList = [];
var iList = [];
var iArr = [];
var centroid = [];

function findSlope(x1, y1, x2, y2) {
	return (y2-y1)/(x2-x1);
}

function angleSort([x1, y1], [x2, y2]) {
	angleA = Math.atan2(y1 - centroid[1], x1 - centroid[0]);
  angleB = Math.atan2(y2 - centroid[1], x2 - centroid[0]);
  return angleA - angleB;
}

function connectPts(arr, lineArr) {
	
	if(arr.length == 0) {
		return lineArr
	}
	else
		if(arr.length == 2) {
			//print(str(arr[0][0]) + ', ' + str(arr[1][0]))
			lineArr.push([arr[0], arr[1]])
			return lineArr
		}
		else {
			var p1 = int(random(0, arr.length));
			var p2 = (p1 + 1 + 2*int(random(0, arr.length/2)))%arr.length
			lineArr.push([arr[p1], arr[p2]])
			//print(str(arr[p1][0]) + ', ' + str(arr[p2][0]))
			if(p1 < p2) {
				var arr1 = arr.slice(p1+1, p2);
				var arr2 = (arr.slice(p2 + 1)).concat(arr.slice(0, p1));

				var retarr1 = connectPts(arr1, lineArr)
				var retarr2 = connectPts(arr2, lineArr)
				return lineArr.concat(retarr1.concat(retarr2));
			}
			else{
				var arr1 = arr.slice(p2+1, p1);
				var arr2 = (arr.slice(p1 + 1)).concat(arr.slice(0, p2));

				var retarr1 = connectPts(arr1, lineArr)
				var retarr2 = connectPts(arr2, lineArr)
				return lineArr.concat(retarr1.concat(retarr2));
			}
			
			
		}
	
	
}

function setup() {
	createCanvas(800, 800);
	background(0);
	stroke(255);
	strokeWeight(0.5);
	noFill();
	//randomSeed(6)
	
	for(y = 0; y < gridN; y++) {
		iArr.push([]);
		for(x = 0; x < gridN; x++) {
			iArr[y].push([]);
			for(i = 0; i < 5; i++) {
				iArr[y][x].push([]);
			}
		}
	}
	
	gridL = width/gridN;
	
	// for(i = 1; i< gridN; i++) {
	// 	line(0, i*gridL, height, i*gridL)
	// }
	// for(i = 1; i< gridN; i++) {
	// 	line(i*gridL, 0, i*gridL, width)
	// }
	
	for(i = 0; i < scribbleLen; i++) {
		vList.push([random(width), random(height)]);
	}
	vList.push(vList[0]);
	
	// beginShape();
	// for(i = 0; i < vList.length; i++) {
	// 	vertex(vList[i][0], vList[i][1]);
	// }
	// endShape();
	
	for(i = 0; i < vList.length - 1; i++) {
		x1 = vList[i][0];
		y1 = vList[i][1];
		x2 = vList[i+1][0];
		y2 = vList[i+1][1];
		
		s = findSlope(x1, y1, x2, y2);
				
		for(j = (x1-(x1%gridL)) + gridL; j <= (x2-(x2%gridL)); j+=gridL) {
			yPos = y1 + (j-x1)*s;
			iList.push([j, yPos]);
			iArr[int(yPos/gridL)][j/gridL][3].push([j, yPos])
			iArr[int(yPos/gridL)][j/gridL - 1][1].push([j, yPos])
			
			iArr[int(yPos/gridL)][j/gridL][4].push([j, yPos])
			iArr[int(yPos/gridL)][j/gridL - 1][4].push([j, yPos])
		}
		
		for(j = (x2-(x2%gridL)) + gridL; j <= (x1-(x1%gridL)); j+=gridL) {
			yPos = y1 + (j-x1)*s;
			iList.push([j, yPos]);
			iArr[int(yPos/gridL)][j/gridL][3].push([j, yPos])
			iArr[int(yPos/gridL)][j/gridL - 1][1].push([j, yPos])
			
			iArr[int(yPos/gridL)][j/gridL][4].push([j, yPos])
			iArr[int(yPos/gridL)][j/gridL - 1][4].push([j, yPos])
		}
		
		for(j = (y1-(y1%gridL)) + gridL; j <= (y2-(y2%gridL)); j+=gridL) {
			xPos = x1 + (j-y1)/s;
			iList.push([xPos, j]);
			iArr[j/gridL][int(xPos/gridL)][0].push([xPos, j])
			iArr[j/gridL - 1][int(xPos/gridL)][2].push([xPos, j])
			
			iArr[j/gridL][int(xPos/gridL)][4].push([xPos, j])
			iArr[j/gridL - 1][int(xPos/gridL)][4].push([xPos, j])
		}
		
		for(j = (y2-(y2%gridL)) + gridL; j <= (y1-(y1%gridL)); j+=gridL) {
			xPos = x1 + (j-y1)/s;
			iList.push([xPos, j]);
			iArr[j/gridL][int(xPos/gridL)][0].push([xPos, j])
			iArr[j/gridL - 1][int(xPos/gridL)][2].push([xPos, j])
			
			iArr[j/gridL][int(xPos/gridL)][4].push([xPos, j])
			iArr[j/gridL - 1][int(xPos/gridL)][4].push([xPos, j])
		}
		
	}

	// for(i = 0; i < iList.length; i++) {
	// 	circle(iList[i][0], iList[i][1], 10);
	// }
	

	
	for(y = 0; y < gridN; y++) {
		for(x = 0; x < gridN; x++) {
			for(i = 0; i < 5; i++) {
				for(j = 0; j < iArr[y][x][i].length; j++) {
					if(i == 0 && false){
						stroke(255, 100, 0)
						circle(iArr[y][x][i][j][0] + 3, iArr[y][x][i][j][1] + 3, 12)
					}
					if(i == 1 && false){
						stroke(0, 255, 0)
						circle(iArr[y][x][i][j][0], iArr[y][x][i][j][1], 5)
					}
					if(i == 2 && false){
						stroke(0, 0, 175)
						circle(iArr[y][x][i][j][0], iArr[y][x][i][j][1], 8)
					}
					if(i == 3 && false){
						stroke(255, 0, 0)
						circle(iArr[y][x][i][j][0], iArr[y][x][i][j][1], 7)
					}
					if(i == 4){
			
					}
				}
			}
		}
	}
	
	
	
	
	for(y = 0; y < gridN; y++) {
		for(x = 0; x < gridN; x++) {
			centroid = [x*gridL + gridL/2, y*gridL + gridL/2];
			iArr[y][x][4].sort(angleSort)
			for(i = 0; i < iArr[y][x][4].length-1; i++) {
				if((iArr[y][x][4][i][0] == iArr[y][x][4][i+1][0] || iArr[y][x][4][i][1] == iArr[y][x][4][i+1][1]) && dist(iArr[y][x][4][i][0], iArr[y][x][4][i][1], iArr[y][x][4][i+1][0], iArr[y][x][4][i+1][1]) < 0) {
					iArr[y][x][4].splice(i, 2);
				}
			}
		}
	}
	
	
	
	
	for(y = 0; y < gridN; y++) {
		for(x = 0; x < gridN; x++) {
			lineArr = connectPts(iArr[y][x][4], [])
			for(i = 0; i < lineArr.length; i++) {
				if(lineArr[i][0][0] > lineArr[i][1][0]) {
					x1 = lineArr[i][0][0];
					y1 = lineArr[i][0][1];
					x2 = lineArr[i][1][0];
					y2 = lineArr[i][1][1];
				}
				else {
					x2 = lineArr[i][0][0];
					y2 = lineArr[i][0][1];
					x1 = lineArr[i][1][0];
					y1 = lineArr[i][1][1];
				}
			
				if (x1 == x2) {
					startAng = 0;
					if(x1 == x*gridL) {
						startAng = (3*PI)/2
					}
					else {
						startAng = PI/2
					}
					arc(x1, (y1+y2)/2, abs(y1-y2), abs(y1-y2), startAng, startAng+PI)
				} 
				else if (y1 == y2) {
					startAng = 0;
					if(y1 == y*gridL) {
						startAng = 0;
					}
					else {
						startAng = PI;
					}  
					arc((x1+x2)/2, y1, abs(x1-x2), abs(x1-x2), startAng, startAng+PI)
				}
				else if (abs(x1-x2) == gridL) {
					s = (y2-y1)/(x2-x1)
					if(s>0) {
						arc(x1, (y1+y2)/2, abs(x1-x2), abs(y1-y2), PI/2, PI)
						arc(x2, (y1+y2)/2, abs(x1-x2), abs(y1-y2), (3*PI)/2, 0)
					}
					else if(s == 0) {
						line(x1, y1, x2, y2);
					}
					else {
						arc(x1, (y1+y2)/2, abs(x1-x2), abs(y1-y2), PI, (3*PI)/2)
						arc(x2, (y1+y2)/2, abs(x1-x2), abs(y1-y2), 0, PI/2)
					}
					
				}
				else if (abs(y1-y2) == gridL) {
					s = (y2-y1)/(x2-x1)
					if(s>0) {
						arc((x1+x2)/2, y2, abs(x1-x2), abs(y1-y2), PI/2, PI)
						arc((x1+x2)/2, y1, abs(x1-x2), abs(y1-y2), (3*PI)/2, 0)
					}
					else if(s == 0) {
						line(x1, y1, x2, y2);
					}
					else {
						arc((x1+x2)/2, y2, abs(x1-x2), abs(y1-y2), PI, (3*PI)/2)
						arc((x1+x2)/2, y1, abs(x1-x2), abs(y1-y2), 0, PI/2)
					}
					
				}
				else {
					if(y1<y2) {
						if(y*gridL == y1) {
							arc(x2, y1, 2*abs(x2-x1), 2*abs(y2-y1), 0, PI/2)
						}
						else {
							arc(x1, y2, 2*abs(x2-x1), 2*abs(y2-y1), PI, (3*PI)/2)
						}
					}
					else {
						if((y+1)*gridL == y1) {
							arc(x2, y1, 2*abs(x2-x1), 2*abs(y2-y1), 3*PI/2, 0)
						}
						else {
							arc(x1, y2, 2*abs(x2-x1), 2*abs(y2-y1), PI/2, PI)
						}
					}
				}
			}
		}
	}
}
