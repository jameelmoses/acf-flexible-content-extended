(function($) {

  const ACFFCE = {

    modals: [],

    init() {

      ACFFCE.removeSinglePreviewModal();
      ACFFCE.addPreviewModalLinkMarkup();

      // Add modal to current layouts
      acf.addAction('load_field/type=flexible_content', function(field) {
        field.$el.find('.acf-flexible-content:first > .values > .layout:not(.fc-modal)').each(function() {
          ACFFCE.addModal($(this));
        });
      });

      // Add modal to new layouts
      acf.addAction('after_duplicate', function($clone, $el) {
        if ($el.is('.layout'))
          ACFFCE.addModal($el);
      });

      // Automatically open the new layout after append it, to improve usability
      acf.addAction('append', function($el) {
        if ($el.is('.layout'))
          $el.find('> .acf-fc-layout-controls a.-pencil').trigger('click');
      });

      // Point error messages inside FC
      acf.addAction('invalid_field', function(field) {
        ACFFCE.invalidField(field.$el);
      });

      // Remove error messages
      acf.addAction('valid_field', function(field) {
        ACFFCE.validField(field.$el);
      });

      // Pressing ESC makes the modal to close
      $(document).keyup(function(e) {
        if (e.keyCode === 27 && $('body').hasClass('acf-modal-open'))
          ACFFCE.close();
      });

      return true;

    },

    removeSinglePreviewModal() {

      // Delete the flexible content preview popup if only one layout
      const flexibleContentField = acf.getField('acf-field-flexible-content');
      flexibleContentField._open = function() {
        const $popup = $(this.$el.children('.tmpl-popup').html());
        if ($popup.find('a').length === 1) {
          // Only one layout
          flexibleContentField.add($popup.find('a').attr('data-layout'));
          return false;
        }
        return flexibleContentField.apply(this, arguments);
      };

    },

    addPreviewModalLinkMarkup() {

      // Add markup to links for easier styling
      $('body').on('click', 'a[data-name="add-layout"]', function() {
        $('.acf-fc-popup a').each(function() {
          const html = '<div class="acf-fc-popup-label">' + $(this).html() + '</div><div class="acf-fc-popup-image"></div>';
          $(this).html(html);
        });
      });
    },

    addModal($layout) {

      $layout.addClass('fc-modal');
      $layout.removeClass('-collapsed');

      // Remove collapse button and click event
      $layout.find('> .acf-fc-layout-handle').off('click');
      $layout.find('> .acf-fc-layout-controls > a.-collapse').remove();

      // Open modal when the collapsed layout is clicked
      $layout.find('> .acf-fc-layout-handle').on('dblclick', ACFFCE.open);

      // Edit button
      const edit = $('<a class="acf-icon -pencil small light" href="#" data-event="edit-layout" title="Edit layout" />');

      // Not a duplicated layout
      if (!$layout.find('> .acf-fc-layout-controls a[data-event="edit-layout"]').length) {

        // Add edit button
        $layout.find('> .acf-fc-layout-controls').append(edit);

        // Add modal elements
        $layout.prepend('<div class="acf-fc-modal-title" />');
        $layout.find('> .acf-fields, > .acf-table').wrapAll('<div class="acf-fc-modal-content" />');

        // Duplicated layout
      } else {
        // Remove old edit button copied from existing layout
        $layout.find('> .acf-fc-layout-controls a[data-event="edit-layout"]').remove();
        // Add new edit button for current layout
        $layout.find('> .acf-fc-layout-controls').append(edit);
      }

      // Bind click event to edit button to open modal
      edit.on('click', ACFFCE.open);

    },

    open() {

      const $layout = $(this).parents('.layout:first');
      const caption = $layout.find('> .acf-fc-layout-handle').html();
      const a = $('<a class="dashicons dashicons-no -cancel" />').on('click', ACFFCE.close);

      $layout.find('> .acf-fc-modal-title').html(caption).append(a);
      $layout.addClass('-modal');

      ACFFCE.modals.push($layout);

      ACFFCE.overlay(true);

    },

    close() {

      const $layout = ACFFCE.modals.pop();

      // Refresh layout title
      const fc = $layout.parents('.acf-field-flexible-content:first');
      const field = acf.getInstance(fc);
      field.closeLayout(field.$layout($layout.index()));

      // Close
      $layout.find('> .acf-fc-modal-title').html(' ');
      $layout.removeClass('-modal').css('visibility', '');
      $layout.addClass('-highlight-closed');

      setTimeout(function() {
        $layout.removeClass('-highlight-closed');
      }, 750);

      ACFFCE.overlay(false);

    },

    overlay(show) {

      if (show === true && !$('body').hasClass('acf-modal-open')) {

        const overlay = $('<div id="acf-flexible-content-modal-overlay" />').on('click', ACFFCE.close);
        $('body').addClass('acf-modal-open').append(overlay);

      } else if (show === false && ACFFCE.modals.length === 0) {

        $('#acf-flexible-content-modal-overlay').remove();
        $('body').removeClass('acf-modal-open');

      }

      ACFFCE.refresh();

    },

    refresh() {

      $.each(ACFFCE.modals, function() {
        $(this).css('visibility', 'hidden').removeClass('-animate');
      });

      const index = ACFFCE.modals.length - 1;

      if (index in ACFFCE.modals)
        ACFFCE.modals[index].css('visibility', 'visible').addClass('-animate');

    },

    invalidField($el) {

      $el.parents('.layout').addClass('layout-error-messages');

    },

    validField($el) {

      $el.parents('.layout').each(function() {
        const $layout = $(this);
        if ($layout.find('.acf-error').length === 0)
          $layout.removeClass('layout-error-messages');
      });

    }

  };

  $(function() {
    ACFFCE.init();
  });

})(jQuery);
