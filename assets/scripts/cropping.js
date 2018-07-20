$(document).ready(function() {
	var cropper = $('#cropper').croppie({
		viewport: {
			width: 275,
			height: 275,
			type: 'square'
		},

		boundary: {
			width: 275,
			height: 275
		}
	});

	//https://stackoverflow.com/a/12369027
	function readFile(input) {
		if (input.files && input.files[0]) {
		    var reader = new FileReader();
			reader.readAsDataURL(input.files[0]);
		    reader.onload = function(e) {
				cropper.croppie('bind', {
		            url: e.target.result
		        }).then(function() {
		            console.log('jQuery bind complete');
		        });
				// image = $('#imageUpload + .uploadedImage');
		        // image.attr('src', e.target.result);
				// image.attr('id', $('#imageUpload').val());
		    }
		} else {
		    alert("Sorry - you're browser doesn't support the FileReader API");
		}
	}

	$("#crop").click(function() {
		cropper.croppie('result', {
            type: 'base64',
            size: 'viewport'
        }).then(function(resp) {
			$('#imageWrapper > .uploadedImage').attr('src', resp);
			$('#imageWrapper > .uploadedImage').attr('id', $('#imageUpload').val());
        });
	});

	document.getElementById("imageUpload").addEventListener("change", function() {
		readFile(this);
	});

});
