Building a basic game to learn more about javascript and application development 

to do: 

*~~Prevent sprite from moving off screen - old school wraparound~~ 
*~~make the sprite something more interesting like a boat~~ 
*~~Make the boat sprite face direction of motion~~ 
*~~Fix boat jumping too far onto screen when wrapping around~~ 
~~*Make game loop use requestAnimationFrame instead of just a timer~~ 
~~*Add a dot to indicate player/beast coords to debug function~~ 
~~*Add cannonball firing~~ 
*~~Add a sea serpent~~ 
~~*Make a hitbox for the beast so it can be hit by cannonball~~ 

*Make serpent remained despawned for a time when hit 
*Found a bug where cannonball gets stuck at 0 x when fired leftward. Repeatable but exact condition unclear 
*Make hitbox for boat so it can be hit by spawning beast 
*Make cannonball look like it's actually coming from side mounted cannon on boat 
*Add hit animation for boat and beast 
*Add waves 
*Clean up functions so draw func only draws and entity movements are handled by wrangle func 
*Fix beast spawns so it's not showing up off the canvas 
*mashing WAD or ASD allows sideways movement, fix? 
*Remove hardcoded pixel values for wrapping sprite at edges 
*Make canvas size responsive 
*~~get this online~~ 
*set up websocket server to allow multiplayer 
*music? 
*~~fix sprite jumping around screen when direction changes~~ 

palette: 

greens: 
2E8B57 
1B6146 
0A4130 

hitbox corner relative to beast position: 
+20 x, +60 y 
opposite hitbox corner relative to first corner: 
+120 x, +45 y (net 140,105) 