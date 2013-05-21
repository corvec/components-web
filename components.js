$(window).bind("load", function() {
	// var table = document.getElementById('component_outer_table');
	// table.getElementsByTagName('col')[5].style.visibility="collapse";

	// set row onclick event:
	var rows = document.getElementsByTagName('tr');
	for (var i = 1; i < rows.length; i++) {
		var data =rows[i].children[5].textContent;
		rows[i].onclick = function(data) {
			return function() {
				if (screen_width() < 1025) {
					alert(data); 
				}
			};
		}(data);
	}

	if(!('contains' in String.prototype))
		String.prototype.contains = function(str, startIndex) { return -1!==this.indexOf(str, startIndex); };
});

function screen_width() {
	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	return width;
}

// This is the action that is called onKeyUp
function action_filter() {
	var filter_criteria = {};

	var search = $('#search').val().toLowerCase();
	filter_document(search);
	
	return false;
}

function filter_row(row) {


}

// Set the visibility of tables in the document such that only those that match
// the filter criteria are shown
function filter_document(search) {
	// There are a few things we can filter by; each is a separate string
	// * Component ID (C11101)
	// * Short Name (Blue Rock)
	// * Long Name (Blue Quartz)
	// * Type (Creation)
	// * Power (1 or Common)
	
	// console.log("filter_document(" + search + ")");

	var filters = search.split(' ');

	var power_ary = ['common','uncommon','rare','singular','scarce','1','2','4'];
	var power_obj = {
		'common':1,
		'uncommon':1,
		'rare':2,
		'singular':4,
		'scarce':4,
		'1':1,
		'2':2,
		'4':4
	};
	
	var col_max = $('#component_table tr')[0].childNodes.length;
	$('#component_table').children().each(function(row_i, row) {
		var hidden = false;
		for (var i = 0; i < filters.length; i++) {
			var crit = filters[i];
			var filter_success = false;
			if (crit in power_obj) {
				// if (row_i == 0)
				// 	console.log('Specifically checking the component power');
				if (crit != 'common' && crit != 'uncommon') {// special cases
					if (!(row.children[3].textContent == power_obj[crit])) {
						hidden = true;
						break;
					}
				} else { // common and uncommon
					if (!(row.children[1].textContent[0].toLowerCase() == crit[0])) {
						hidden = true;
						break;
					}
				}
			} else {
				// if (row_i < 10)
				// 	console.log('Checking filter "' + crit + '" in row ' + row_i);
				for (var j = 1; j < col_max; j++) {
					if (row.children[j].textContent.toLowerCase().contains(crit)) {
						filter_success = true;
						// if (row_i < 10)
						// 	console.log('filter found in row ' + row_i);
						break;
					}
				}
				if (!filter_success) {
					hidden = true;
					// if (row_i < 10)
					// 	console.log('filter not found in row ' + row_i);
					break;
				}
			}
		}
		if (hidden) {
			// if (row_i < 10)
			// 	console.log('Hiding row ' + row_i);
			if (typeof(row.hide) === typeof(Function)) {
				row.hide();
			} else {
				row.style.display = 'none';
			}
		} else {
			// if (row_i < 10)
			// 	console.log('Showing row ' + row_i);
			if (typeof(row.show) === typeof(Function)) {
				row.show();
			} else {
				row.style.display = '';
			}
		}
	});


	
}

