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