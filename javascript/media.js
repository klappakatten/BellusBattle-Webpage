//Display selected media with 100% width on top of the mediacontainer

$(document).ready(function () {
  const container = $("#media-container");

  const containerChildren = container.children();
  let selected = containerChildren.first();

  function mediaOnTop() {
    //Dont do anything if the media is already on top
    if (this == selected) return;
    //Check if the element is of type video and handle controls
    if (selected.get(0).nodeName == "VIDEO") {
      selected.removeAttr("controls", "");
      $(selected).trigger("pause");
    } else if ($(this).get(0).nodeName == "VIDEO") {
      $(this).attr("controls", "");
    }

    //Place the media on top
    $(selected).insertAfter(this);
    $(container).prepend(this);

    //Change size of the media
    selected.removeClass("span-3");
    selected.addClass("notselected");
    $(this).addClass("span-3");
    $(this).removeClass("notselected");

    selected = $(this);
  }
  for (let i = 0; i < containerChildren.length; i++) {
    $("#media-" + (i + 1)).on("click", mediaOnTop);
  }
});
