Ext.define('MyExtGenApp.view.tensorflow.TensorflowView', {
	xtype: 'tensorflowview',
	cls: 'tensorflowview',
	controller: { type: 'tensorflowviewcontroller' },
	viewModel: { type: 'tensorflowviewmodel' },
	requires: [],
	extend: 'Ext.panel.Panel',
	html: '<img src="https://dummyimage.com/600x400&text=placeholder" id="image-placeholder" class="img-placeholder img-placeholder__big">' +
	'<img src="https://dummyimage.com/600x400&text=placeholder" id="output" class="img-placeholder">',

	items: [{
		xtype: 'filefield',
		cls: 'file-input__container',
        name: 'photo',
        fieldLabel: 'Photo',
        labelWidth: 50,
        msgTarget: 'side',
        allowBlank: false,
        anchor: '100%',
        buttonText: 'Select Photo...'
    }],

    buttons: [{
		cls: 'submit-image',
        text: 'Upload',
        handler: function() {


			function normalPhoto(){
				let file;
				const image = document.getElementById('image-placeholder')
				const input = document.querySelector(".file-input__container .x-button-el")

				let reader = new FileReader();
				reader.onload = function (e) {
					file = e.target.result;
					image.src = file;
				}
				reader.readAsDataURL(input.files[0]);

				resizeImage();
			}



			function resizeImage() {

				const input = document.querySelector(".file-input__container .x-button-el")

				if (window.File && window.FileReader && window.FileList && window.Blob) {

					var filesToUploads = input.files;
					var file = filesToUploads[0];
					if (file) {

						var reader = new FileReader();
						reader.onload = function (e) {

							var img = document.createElement("img");
							img.src = e.target.result;

							var canvas = document.createElement("canvas");
							var ctx = canvas.getContext("2d");
							ctx.drawImage(img, 0, 0);

							var MAX_WIDTH = 400;
							var MAX_HEIGHT = 250;
							var width = img.width;
							var height = img.height;

							if (width > height) {
								if (width > MAX_WIDTH) {
									height *= MAX_WIDTH / width;
									width = MAX_WIDTH;
								}
							} else {
								if (height > MAX_HEIGHT) {
									width *= MAX_HEIGHT / height;
									height = MAX_HEIGHT;
								}
							}
							canvas.width = width;
							canvas.height = height;
							var ctx = canvas.getContext("2d");
							ctx.drawImage(img, 0, 0, width, height);

							dataurl = canvas.toDataURL(file.type);
							document.getElementById('output').src = dataurl;
						}
						reader.readAsDataURL(file);

					}

				} else {
					alert('The File APIs are not fully supported in this browser.');
				}


				const img = document.getElementById('output');
				mobilenet.load().then(model => {
					// Classify the image.
					model.classify(img).then(predictions => {
						console.log('Predictions: ');
						console.log(predictions);
					});
				});
			}

			normalPhoto();
        }
    }]
});





