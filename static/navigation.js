
var running = false;
var paused = true;
var pageNumber = -1;
var frame;
var gameframe;
var frameoverlay;
var queuedLevel = "";

function main()
{
    frame = document.getElementById("frame");
    gameframe = document.getElementById("game-iframe");
    frameoverlay = document.getElementById("frame-overlay");
}

var finalPage = 3;

function togglePause()
{
    paused = !paused;

    if (paused)
    {
        frameoverlay.style.backgroundColor = "#666666bd";
        frameoverlay.style.opacity = "100%";
        frameoverlay.style.pointerEvents = "auto";
    }
    else
    {
        if (!running)
        {
            running = true;
            frameoverlay.style.backgroundImage = "";
            document.getElementById("play-button").style.display = "none";
            document.getElementById("pause-menu").style.display = "flex";
        }

        frameoverlay.style.backgroundColor = "#66666600";
        frameoverlay.style.opacity = "0%";
        frameoverlay.style.pointerEvents = "none";

        gameframe.contentWindow.document.getElementById("canvas").focus();
    }
}

async function changePage(newPage)
{
    if (newPage == 0)
    {
        homePage();
        return;
    }

    pageNumber = newPage;
    document.getElementById("play-button").style.display = "";
    document.getElementById("pause-menu").style.display = "none";
    
    
    const response = await fetch("/episodes/" + pageNumber + "/info.json");
    let info;
    if (!response.ok)
    {
        info = {"title": "No Title", "thumbnail": ""};
    }
    else
    {
        info = await response.json();
    }

    window.history.replaceState({id : "100"}, "Page " + (pageNumber) + " | Frame", "/" + (pageNumber));
    running = false;
    paused = true;
    gameframe.src = "null";
    queuedLevel = "/episodes/" + (pageNumber) + "/index.html"
    document.getElementById("title-text").innerText = info.title;
    document.title = info.title + " | Frame";

    let thumbnail_url = "/episodes/" + (pageNumber) + "/thumbnail.png";
    if ("thumbnail" in info)
        thumbnail_url = info.thumbnail;
    frameoverlay.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(" + thumbnail_url + ")";

    // document.getElementById("firstButton").disabled = pageNumber == 1;
    // document.getElementById("previousButton").disabled = pageNumber <= 1;
    // document.getElementById("nextButton").disabled = pageNumber >= finalPage;
    // document.getElementById("lastButton").disabled = pageNumber == finalPage;

    document.getElementById("level-page").style.display = "";
    document.getElementById("home-page").style.display = "none";
}

function homePage()
{
    document.getElementById("level-page").style.display = "none";
    document.getElementById("home-page").style.display = "";
    document.getElementById("title-text").innerText = "";
    frameoverlay.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))";

    running = false;
    paused = true;
    gameframe.src = "null";

    window.history.replaceState({id : "100"}, "Frame", "/");
    document.title = "Frame";

    // document.getElementById("firstButton").disabled = true;
    // document.getElementById("previousButton").disabled = true;
    // document.getElementById("nextButton").disabled = true;
    // document.getElementById("lastButton").disabled = true;
}

function firstPage()
{
    changePage(1);
}

function lastPage()
{
    changePage(finalPage);
}

function nextPage()
{
    if (pageNumber != finalPage)
        changePage(pageNumber + 1);
}

function previousPage()
{
    if (pageNumber != 1)
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

function startLevel()
{
    gameframe.src = queuedLevel;
}

function openNav()
{
    document.getElementById("nav-panel").style.right = "0%";
    document.getElementById("nav-background").style.pointerEvents = "all";
    document.getElementById("nav-background").style.opacity = "50%";
}

function closeNav()
{
    document.getElementById("nav-panel").style.right = "-50%";
    document.getElementById("nav-background").style.pointerEvents = "none";
    document.getElementById("nav-background").style.opacity = "0%";
}

addEventListener('keydown', detectPause);
