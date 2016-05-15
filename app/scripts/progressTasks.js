var progressTasks = (function() {
	var tasks = 0;

	// casheDom
	var $progress = $('#progressModule'),
		template = $progress.find('#progressTasks-template').html();

	// bindEvents
	events.on('completedTasks', updateProgress);

	_render();

	function _render() {
		$progress.html(Mustache.render(template, {tasks: tasks}));
	}

	function updateProgress(newTasks) {
		tasks = newTasks;
		_render();
	}

	function percentProgress(newTasks) {
		progressPercent = precentDone(newTasks);
		_render();
	}

	function percentDone(num) {
		var percentToGo = (num/totalTasks) * 100;
		precentToGo = Math.floor(percentToGo);
		_render();
	}

	function destroy() {
		$progress.remove();
		events.off('completedTasks', updateProgress);
	}

	return {
		destroy: destroy
	};

})();

// events.on('completedTasks', function(count) {
// 	alert(count);
// });