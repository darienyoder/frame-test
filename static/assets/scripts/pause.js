
function detectPause(e)
{
    if (e.key === "Escape") {
        togglePause();
    }
}

addEventListener('keydown', detectPause);
