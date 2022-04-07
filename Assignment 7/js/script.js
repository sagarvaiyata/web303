$(function () {
  $("#photo-viewer")
    .photoViewer()
    .show()
    .on("click", ".photo-frame", function (e) {
      var $content = $(this).clone().find("img").css({
        marginLeft: 0,
        marginTop: 0,
        width: "100%",
        height: "95%",
      });

      var modal = (function () {
        var method = {},
          $overlay,
          $modal,
          $close;

        // Append the HTML
        $overlay = $('<div id="overlay"></div>');
        $modal = $('<div id="modal"></div>');
        $close = $('<button role="button" class="modal-close">CLOSE</button>');

        $modal.hide();
        $overlay.hide();
        $modal.append($content, $close);

        $(document).ready(function () {
          $("body").append($overlay, $modal);
        });

        // Center the modal in the viewport
        method.center = function () {
          var top, left;

          top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
          left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

          $modal.css({
            top: top + $(window).scrollTop(),
            left: left + $(window).scrollLeft(),
          });
        };

        // Open the modal
        method.open = function (settings) {
          $content.empty().append(settings.content);

          $modal.css({
            width: settings.width || "auto",
            height: settings.height || "auto",
          });

          method.center();

          $(window).bind("resize.modal", method.center);

          $modal.show();
          $overlay.show();
        };

        // Close the modal
        method.close = function () {
          $modal.hide();
          $overlay.hide();
          $content.empty();
          $(window).unbind("resize.modal");
        };

        $close.click(function (e) {
          e.preventDefault();
          method.close();
        });

        return method;
      })();

      modal.open({content: $content, width:800, height:450});
    });
});
