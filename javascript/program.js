$(document).ready(function () {
  const characters = [
    $("#character-1"),
    $("#character-2"),
    $("#character-3"),
    $("#character-4"),
  ];
  let displayAllChars = false;
  let animationIsPlaying = false;
  const delay = 500;

  //Display selected character information and hide non selected characters, use <p> after every character
  function showCharacterInfo(e) {
    if (animationIsPlaying) return;
    coolDown(delay * 2);
    if (!displayAllChars) {
      for (i = 0; i < characters.length; i++) {
        if (characters[i].get(0) == e.currentTarget) {
          characters[i].children("img").removeClass("blackfilter");
          characters[i].next("p").hide();
          characters[i].next("p").delay(delay).removeClass("hidden");
          characters[i].next("p").fadeIn(delay);
          characters[i].children("figcaption").animate(
            {
              opacity: 0,
            },
            delay
          );
          characters[i].fadeOut(delay);
          characters[i].fadeIn(delay);
        } else {
          characters[i].fadeOut(delay);
        }
      }
      displayAllChars = true;
    } else {
      //Reset displayed characters to default
      for (i = 0; i < characters.length; i++) {
        if (characters[i].get(0) == e.currentTarget) {
          characters[i].next("p").fadeOut(delay);
          characters[i]
            .children("figcaption")
            .delay(delay)
            .animate({ opacity: 1 }, delay);
          characters[i].fadeOut(delay);
          characters[i].fadeIn(delay); //que fadein
        } else {
          characters[i].delay(delay).fadeIn(delay);
        }
      }
      displayAllChars = false;
    }
  }
  //animation cooldown
  function coolDown(ms) {
    animationIsPlaying = true;
    setTimeout(() => {
      animationIsPlaying = false;
    }, ms);
  }
  $("#tabs").removeClass("hidden"); //show tabs if javascript enabled in browser
  $("#accordion").removeClass("hidden"); //show accordion if javascript enabled in browser
  $("#tabs").tabs();
  $("#accordion").accordion({
    heightStyle: "content", //make sure all content is displayed
  });
  $("#character-1").on("click", showCharacterInfo);
  $("#character-2").on("click", showCharacterInfo);
  $("#character-3").on("click", showCharacterInfo);
  $("#character-4").on("click", showCharacterInfo);
});
