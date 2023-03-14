from pyaxidraw import axidraw   # import module
ad = axidraw.AxiDraw()          # Initialize class
ad.interactive()                # Enter interactive context
if not ad.connect():            # Open serial port to AxiDraw;
    quit()                      #   Exit, if no connection.
    print("Exited early")
                                # Absolute moves follow:
ad.moveto(1, 1)                 # Pen-up move to (1 inch, 1 inch)
ad.lineto(2, 1)                 # Pen-down move, to (2 inch, 1 inch)
ad.moveto(0, 0)                 # Pen-up move, back to origin.
ad.disconnect()                 # Close serial port to AxiDraw


# size inch  moveto max (16.53, 11.69)