(function() {
    var intervalId,
        steps = [];

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

    $("#temperature-slider").on("slide", function(slideEvt) {
        $("#temperature-slider-value").text(slideEvt.value);
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

    $(function() {
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

    var incrementProgress = function() {
        var step = 10;
        var currentWidth = $('#progress').width() / $('#progress').parent().width() * 100 + step;
        console.log("currentWidth", currentWidth);
        if (currentWidth >= 100) {
            console.log("ready", intervalId);
            clearInterval(intervalId);
            $('#gif').hide();
            $('#washed').show();
        }

        $('#progress').width(currentWidth + '%');
        var step1 = Math.floor(currentWidth * steps.length / 100);
        console.log("step", step1);
        $('#process-step').text(steps[step1]);
    }

    $('#start-btn').on('click', function(event, state) {
        $('#setup-container').hide();
        $('#gif').show();
        if ($('input[name="prewash"]').is(':checked')) {
            steps.push("Предпране");
        }

        if ($('input[name="wash"]').is(':checked')) {
            steps.push("Пране");
        }

        if ($('input[name="rinse"]').is(':checked')) {
            steps.push("Изплакване");
        }

        if ($('input[name="centrifuge"]').is(':checked')) {
            steps.push("Центрофуга");
        }

        if ($('input[name="iron"]').is(':checked')) {
            steps.push("Още малко въртене");
        }

        intervalId = setInterval(incrementProgress, 1);
    });
})();