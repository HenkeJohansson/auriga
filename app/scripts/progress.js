var progress = (function() {
	var tasks = 0;

	// casheDom
	var $progress = $('#progressModule'),
		template = $progress.find('#progress-template').html();

	// bindEvents
	events.on('completedTasksChanged', updateProgress);

	_render();

	function _render() {
		$progress.html(Mustache.render(template, {tasks: tasks}));
	}

	function updateProgress(newTasks) {
		tasks = newTasks;
		_render();
	}

	function destroy() {
		$progress.remove();
		events.off('completedTasksChanged', updateProgress);
	}

	return {
		destroy: destroy
	};

})();

// events.on('completedTasksChanged', function(count) {
// 	alert(count);
// });