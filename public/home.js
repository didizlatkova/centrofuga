(function() {

    $('.my-checkbox').bootstrapSwitch();

    $('.my-slider').slider({
        formatter: function(value) {
            return 'Времетраене в минути: ' + value;
        }
    });

    $("#prewash-slider").on("slide", function(slideEvt) {
        $("#prewash-slider-value").text(slideEvt.value);
    });

    $("#wash-slider").on("slide", function(slideEvt) {
        $("#wash-slider-value").text(slideEvt.value);
    });

    $("#rinse-slider").on("slide", function(slideEvt) {
        $("#rinse-slider-value").text(slideEvt.value);
    });

    $('input[name="prewash"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $("#prewash-slider").slider("enable");
        } else {
            $("#prewash-slider").slider("disable");
        }
    });

    $('input[name="wash"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $("#wash-slider").slider("enable");
        } else {
            $("#wash-slider").slider("disable");
        }
    });

    $('input[name="rinse"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $("#rinse-slider").slider("enable");
        } else {
            $("#rinse-slider").slider("disable");
        }
    });

    $(":input").change(function() {
        calculateTotalTime();
    });

    $('.my-checkbox').on('switchChange.bootstrapSwitch', function(event, state) {
        calculateTotalTime();
    });

    var calculateTotalTime = function() {
        var time = 0;
        if ($('input[name="prewash"]').is(':checked')) {
            time += $("#prewash-slider").slider('getValue');
        }

        if ($('input[name="wash"]').is(':checked')) {
            time += $("#wash-slider").slider('getValue');
        }

        if ($('input[name="rinse"]').is(':checked')) {
            time += $("#rinse-slider").slider('getValue');
        }

        if ($('input[name="centrifuge"]').is(':checked')) {
            time += 10;
        }

        if ($('input[name="iron"]').is(':checked')) {
            time += 5;
        }

        $("#time").text(time);
    };
})();