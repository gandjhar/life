console.log("*** Conway's Game of Life ***");

var nstep = 0;
var dimen = 10;
var cells = new Array;

function isAlive( cells, i, j )
{
    return cells[ i * dimen + j ];
}

function setAlive( cells, i, j, val )
{
    cells[ i * dimen + j ] = val;
}

// 0 if indexes are out of bounds
// otherwise 1 if cell is alive, 0 if empty
function countCell( cells, i, j )
{
   if ( i < 0 || i > dimen - 1 ) {
      return 0;
   }

   if ( j < 0 || j > dimen - 1 ) {
      return 0;
   }

   return isAlive( cells, i, j ) ? 1 : 0;
}


// Initialize a random world
function init()
{
   for (var y = 0; y < dimen; y++) {
      for (var x = 0; x < dimen; x++) {
         setAlive( cells, x, y, Math.random() < 0.3 );
      }
   }
}


function display()
{
   for (var y = 0; y < dimen; y++) {
      var s = "";

      for (var x = 0; x < dimen; x++) {
         v = isAlive( cells, x, y );

         s += v ? "O" : " ";
      }

      console.log( s );
   }
}

// Count neightbors of a cell
function countNeighbors( cells, i, j )
{
   var n = 0;

   n += countCell( cells, i - 1, j - 1 );
   n += countCell( cells, i - 1, j     );
   n += countCell( cells, i - 1, j + 1 );

   n += countCell( cells, i, j - 1 );
   n += countCell( cells, i, j + 1 );

   n += countCell( cells, i + 1, j - 1 );
   n += countCell( cells, i + 1, j     );
   n += countCell( cells, i + 1, j + 1 );

   return n;
}


// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by over-population.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function live()
{
   var nextCells = new Array;

   for (var y = 0; y < dimen; y++) {
      for (var x = 0; x < dimen; x++) {
         n = countNeighbors( cells, x, y );

         var lives;

         if ( isAlive( cells, x, y ) ) {  // is currently alive
            lives = ( n >= 2 && n <= 3 );
         }
         else { // is currently empty
            lives = ( n == 3 );
         }

         // console.log( x + " " + y + " = " + n + " " + alive );

         setAlive( nextCells, x, y, lives );
      }
   }

   cells = nextCells;
}


function step()
{
   console.log("step: " + nstep + "\n");
   nstep +=1;

   display();

   live();

   console.log("");

   // Put you game code here to do one step of the "life world".
}

function tick()
{
   step();

   if ( nstep > 20 ) {
      process.exit();
   }

   setTimeout( tick, 1000 );
}

function run()
{
   init();

   // Start the ticking clock.
   tick();
}

run();