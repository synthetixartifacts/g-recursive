function copyCodeToClipboard() {

    const code      = document.getElementById('code');
    const range     = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        document.execCommand('copy');
        alert('Code copied to clipboard');
    } catch (err) {
        alert('Unable to copy code to clipboard');
    }

    selection.removeAllRanges();
}


$(function() {
    $('.copy-to-clip').on("click", function () {
        const $button   = $(this);
        const $response = $button.closest('.response');
        const $code     = $response.find('.gpt-response');

        const range     = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents($code[0]);
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            document.execCommand('copy');

            // Change text to copied and roll back after 2sec
            $button.html('✔ Copied');

            setTimeout(() => {
                $button.html('Copy to clipboard');
            }, 2000);
        } catch (err) {
            alert('Unable to copy code to clipboard');
        }

        selection.removeAllRanges();
    });
});