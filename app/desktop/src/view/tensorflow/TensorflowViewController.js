Ext.define('MyExtGenApp.view.tensorflow.TensorflowViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.tensorflowviewcontroller',


 	eventChange: function(){
		var files = itemFile.files;
		console.log(files);
	},
	onSubmit: function () {

		var form = this.getView();

		var input = document.getElementById('ext-element-64');
		let image123 = document.getElementById('image123');
		var image;

		console.log(input, image123, input.value, input.files);


			let reader = new FileReader();
			reader.onload = function (e) {
				console.log(e, "@")
				image = e.target.result;
				console.log(image);
				image123.src = image;

			}
			reader.readAsDataURL(input.value);




	}


});



