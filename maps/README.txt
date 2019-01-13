Map Loading Information
=======================

 [*] All map files have the ".map" extension, and contain all the tile data (the ground/floor),
     as well as any sprite data (the objects/images placed on top of the tiles). Some maps may
     not contain any sprite data.
 
 [*] Each map file contains two parts, seperated by an equals character "=" to notify the file
     reader. The part before the equals is the tile data. It can be read as a 2D array, and in
     fact does become a 2D array in the program. The part after the equals is the sprite data,
     and can also be read as a 2D array.
     
 
==== Creating and Editing Maps ====
 
A full, user-friendly map editing feature may be implemented in the future, but for now users
must create and edit maps manually. To do so, simply open a map file in your favorite text editor
and edit the integers in the tile and/or sprite arrays by referencing the legend below. Don't
forget to save the file before you attempt to open it in the program!


*** MAP FILE LEGEND ***

TILES

0 = Grass
1 = Sand
2 = Water
3 = Grass with trees

SPRITES

0 = Building 1 (Mid-size gray tower)
