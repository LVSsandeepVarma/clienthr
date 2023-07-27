import TomSelect from "tom-select";

(function () {
    "use strict";

    // Tom Select
    $(".tom-select").each(function () {
        let options = {
            plugins: {
                dropdown_input: {},
            },
        };

<<<<<<< Updated upstream
        if ($(this).data("placeholder")) {
            options.placeholder = $(this).data("placeholder");
        }
        console.log()
$(this).data("placeholder")
        if ($(this).attr("multiple") !== undefined) {
            console.log("multiple")
            options = {
                ...options,
                plugins: {
                    ...options.plugins,
                    remove_button: {
                        title: "Remove this item",
                    },
                },
                persist: false,
                create: true,
                onDelete: function (values) {
                    return confirm(
                        values.length > 1
                            ? "Are you sure you want to remove these " +
                                  values.length +
                                  " items?"
                            : 'Are you sure you want to remove "' +
                                  values[0] +
                                  '"?'
                    );
                },
            };
        }
=======
    if ($(this).data("placeholder")) {
      options.placeholder = $(this).data("placeholder");
    }
    console.log();
    $(this).data("placeholder");
    if ($(this).attr("multiple") !== undefined) {
      console.log("multiple");
      options = {
        ...options,
        plugins: {
          ...options.plugins,
          remove_button: {
            title: "Remove this item",
          },
        },
        persist: false,
        create: true,
        onDelete: function (values) {
          return confirm(
            values?.length > 1
              ? "Are you sure you want to remove these " +
                  values?.length +
                  " items?"
              : 'Are you sure you want to remove "' + values[0] + '"?'
          );
        },
      };
    }
>>>>>>> Stashed changes

        if ($(this).data("header")) {
            options = {
                ...options,
                plugins: {
                    ...options.plugins,
                    dropdown_header: {
                        title: $(this).data("header"),
                    },
                },
            };
        }

        new TomSelect(this, options);
    });
})();
