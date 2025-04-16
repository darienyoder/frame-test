
var running = false;
var paused = true;
var frame = document.getElementById("frame");
var gameframe = document.getElementById("game-iframe");
var frameoverlay = document.getElementById("frame-overlay");
var pageNumber = -1;

const pages = [
    "/",
    "/software-engineering-team-beta/minigolf",
    "/crossword-builder",
    "/mood9",
]

const coverImages = [
    "https://wallpapers.com/images/featured/cat-pictures-zc3gu0636kmldm04.jpg",
    "https://darienyoder.com/assets/images/headers/minigolf.png",
    "https://wallpaper-house.com/data/out/6/wallpaper2you_103955.jpg",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kittyloaf.com%2Fwp-content%2Fuploads%2F2017%2F06%2FValentine_KittyLoaf_071417-375x375.png",
]

var finalPage = pages.length - 1;

function togglePause()
{
    paused = !paused;

    if (paused)
    {
        frame.style.top = "50px";
        frame.style.left = "50px";
        frame.style.width = "calc(100% - 100px)";
        frame.style.height = "calc(100vh - 70px)";

        frameoverlay.style.backgroundColor = "#666666bd";
        frameoverlay.style.opacity = "100%";
        frameoverlay.style.pointerEvents = "auto";

        frame.style.borderBottom = "5px solid white";
        frame.style.borderLeft = "5px solid white";
        frame.style.borderRight = "5px solid white";

        // frame.style.borderRadius = "0px 0px 10px 15px";
        // frameoverlay.style.borderRadius = "0px 0px 20px 20px";

        document.getElementById("level-title").style.bottom = "0%";
    }
    else
    {
        if (!running)
        {
            running = true;
            gameframe.src = pages[pageNumber];
            frameoverlay.style.backgroundImage = "";
        }
        frame.style.top = "0px";
        frame.style.left = "0px";
        frame.style.width = "100%";
        frame.style.height = "100vh";

        frameoverlay.style.backgroundColor = "#66666600";
        frameoverlay.style.opacity = "0%";
        frameoverlay.style.pointerEvents = "none";

        frame.style.borderBottom = "0px solid white";
        frame.style.borderLeft = "0px solid white";
        frame.style.borderRight = "0px solid white";

        // frame.style.borderRadius = "";
        // frameoverlay.style.borderRadius = "";

        document.getElementById("level-title").style.bottom = "100%";
    }
}

function changePage(newPage)
{
    window.history.replaceState({id : "100"}, "Page " + (pageNumber + 1) + " | Frame", "/frame-test/" + (pageNumber + 1));
    pageNumber = newPage;
    running = false;
    gameframe.src = "";
    document.title = "Page " + (pageNumber + 1) + " | Frame";
    frameoverlay.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(" + coverImages[pageNumber] + ")";

    document.getElementById("firstButton").disabled = pageNumber == 0;
    document.getElementById("previousButton").disabled = pageNumber <= 0;
    document.getElementById("nextButton").disabled = pageNumber >= finalPage;
    document.getElementById("lastButton").disabled = pageNumber == finalPage;

    document.getElementById("level-page").style.display = "";
    document.getElementById("home-page").style.display = "none";
}

function homePage()
{
    document.getElementById("level-page").style.display = "none";
    document.getElementById("home-page").style.display = "";
}

function firstPage()
{
    changePage(0);
}

function lastPage()
{
    changePage(finalPage);
}

function nextPage()
{
    changePage(pageNumber + 1);
}

function previousPage()
{
    changePage(pageNumber - 1);
}

function detectPause(e)
{
    if (running && e.key === "Escape") {
        togglePause();
    }
}

function enablePause()
{
    gameframe.contentWindow.removeEventListener('keydown', detectPause);
    gameframe.contentWindow.addEventListener('keydown', detectPause);
}

addEventListener('keydown', detectPause);
homePage();
