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
        $("input:hidden[name=prewash]").val(slideEvt.value);
    });

    $("#wash-slider").on("slide", function(slideEvt) {
        $("#wash-slider-value").text(slideEvt.value);
        $("input:hidden[name=wash]").val(slideEvt.value);
    });

    $("#rinse-slider").on("slide", function(slideEvt) {
        $("#rinse-slider-value").text(slideEvt.value);
        $("input:hidden[name=rinse]").val(slideEvt.value);
    });

    $("#temperature-slider").on("slide", function(slideEvt) {
        $("#temperature-slider-value").text(slideEvt.value);
        $("input:hidden[name=temperature]").val(slideEvt.value);
    });

    $('input[name="prewash"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $("#prewash-slider").slider("enable");
            $("input:hidden[name=prewash]").val($("#prewash-slider-value").text());
        } else {
            $("#prewash-slider").slider("disable");
            $("input:hidden[name=prewash]").val(0);
        }
    });

    $('input[name="wash"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $("#wash-slider").slider("enable");
            $("input:hidden[name=wash]").val($("#wash-slider-value").text());
        } else {
            $("#wash-slider").slider("disable");
            $("input:hidden[name=wash]").val(0);
        }
    });

    $('input[name="rinse"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $("#rinse-slider").slider("enable");
            $("input:hidden[name=rinse]").val($("#rinse-slider-value").text());
        } else {
            $("#rinse-slider").slider("disable");
            $("input:hidden[name=rinse]").val(0);
        }
    });

    $('input[name="centrifuge"]').on('switchChange.bootstrapSwitch', function(event, state) {
        $("input:hidden[name=centrifuge]").val(state);
    });

    $('input[name="iron"]').on('switchChange.bootstrapSwitch', function(event, state) {
        $("input:hidden[name=iron]").val(state);
    });

    $(":input").change(function() {
        calculateTotalTime();
    });

    $('.my-checkbox').on('switchChange.bootstrapSwitch', function(event, state) {
        calculateTotalTime();
    });

    $(function() {
        calculateTotalTime();
        setupHiddenFields();
    });

    var setupHiddenFields = function() {
        $("input:hidden[name=prewash]").val($("#prewash-slider-value").text());
        $("input:hidden[name=wash]").val($("#wash-slider-value").text());
        $("input:hidden[name=rinse]").val($("#rinse-slider-value").text());
        $("input:hidden[name=temperature]").val($("#temperature-slider-value").text());
        $("input:hidden[name=centrifuge]").val($('input[name="centrifuge"]').is(":checked"));
        $("input:hidden[name=iron]").val($('input[name="iron"]').is(":checked"));
    }

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
        var currentWidth = $('#progress').width() / $('#progress').parent().width() * 100 + 10;
        if (currentWidth >= 100) {
            clearInterval(intervalId);
            $('#gif').hide();
            $('#washed').show();
        }

        $('#progress').width(currentWidth + '%');
        var step = Math.floor(currentWidth * steps.length / 100);
        $('#process-step').text(steps[step]);
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