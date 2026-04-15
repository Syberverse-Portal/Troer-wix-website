$w.onReady(function () {

    // -- Logo ----------------------------------------------
    $w('#headerLogo').text = 'Troer';
    $w('#headerLogo').style.color = '#1A1A1A';

    // -- CTA Button ----------------------------------------
    $w('#headerCtaButton').label = 'WORK WITH US';
    $w('#headerCtaButton').style.backgroundColor = '#2962FF';
    $w('#headerCtaButton').style.color = '#FFFFFF';
    $w('#headerCtaButton').style.borderColor = '#2962FF';

    $w('#headerCtaButton').onMouseIn(() => {
        $w('#headerCtaButton').style.backgroundColor = '#4A90E2';
        $w('#headerCtaButton').style.borderColor = '#4A90E2';
    });

    $w('#headerCtaButton').onMouseOut(() => {
        $w('#headerCtaButton').style.backgroundColor = '#2962FF';
        $w('#headerCtaButton').style.borderColor = '#2962FF';
    });

});
