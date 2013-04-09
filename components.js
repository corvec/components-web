$(window).bind("load", function() {
	// var table = document.getElementById('component_outer_table');
	// table.getElementsByTagName('col')[5].style.visibility="collapse";

	// set row onclick event:
	var rows = document.getElementsByTagName('tr');
	for (var i = 1; i < rows.length; i++) {
		var data =rows[i].children[6].textContent;
		rows[i].onclick = function(data) {
			return function() {
				// if (document.getElementById('invis_header').hidden) {
					alert(data); 
				// }
			};
		}(data);
	}
});


// This is the action that is called onKeyUp
function action_filter() {
	var filter_criteria = {};

	var search = $('#search').val().toLowerCase();
	filter_document(search);
	
	return false;
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
	$('#component_table').children().each(function() {
		var row = $(this);
		var hidden = false;
		for (var i = 0; i < filters.length; i++) {
			var crit = filters[i];
			var filter_success = false;
			if (crit in power_obj) {
				console.log('Specifically checking for the power of the component');
				if (crit != 'common' && crit != 'uncommon') {// special cases
					if (!(row.children()[3].textContent == power_obj[crit])) {
						hidden = true;
					}
				} else { // common and uncommon
					if (!(row.children()[1].textContent[0].toLowerCase() == crit[0])) {
						hidden = true;
					}
				}
			} else {
				for (var j = 1; j < col_max; j++) {
					if (row.children()[j].textContent.toLowerCase().contains(crit)) {
						filter_success = true;
						break;
					}
				}
				if (!filter_success) {
					hidden = true;
				}
			}
		}
		if (hidden) { row.hide(); } else { row.show(); }
	});


	
}

