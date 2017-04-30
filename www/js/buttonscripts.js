var PauseBoolean = false;
var modeTP = 0;

function PressPauseButton()
{
     var PauseButton = document.getElementById("pause");

     if(!PauseBoolean)
     {
          PauseButton.className = "active";
          PauseBoolean = true;

     }
     else
     {
          PauseButton.className = "button";
          PauseBoolean = false;
     }
}

function PressStartButton()
{
     document.getElementById("start").className = "active";
     document.getElementById("stop").className = "button";
}

function PressStopButton()
{
     document.getElementById("start").className = "button";
     document.getElementById("stop").className = "active";
}

function PressWalking()
{
     modeTP = "Walking";
     document.getElementById("walking").className = "activediv";
     document.getElementById("bicycling").className = "inactivediv";
     document.getElementById("driving").className = "inactivediv";
}

function PressBicycling()
{
     modeTP = "Bicycling";
     document.getElementById("walking").className = "inactivediv";
     document.getElementById("bicycling").className = "activediv";
     document.getElementById("driving").className = "inactivediv";
}

function PressDriving()
{
     modeTP = "Driving";
     document.getElementById("walking").className = "inactivediv";
     document.getElementById("bicycling").className = "inactivediv";
     document.getElementById("driving").className = "activediv";
}
