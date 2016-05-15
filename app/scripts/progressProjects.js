var progressProjects = (function() {
	var projects = 0;

	// casheDom
	var $progress = $('#progressModule'),
		template = $progress.find('#progressProjects-template').html();

	// bindEvents
	events.on('projectsAmount', updateProgress);

	_render();

	function _render() {
		$progress.html(Mustache.render(template, {projects: projects}));
	}

	function updateProgress(newProjects) {
		projects = newProjects;
		_render();
	}

	function percentProgress(newProjects) {
		progressPercent = precentDone(newProjects);
		_render();
	}

	function percentDone(num) {
		var percentToGo = (num/totalTasks) * 100;
		precentToGo = Math.floor(percentToGo);
		_render();
	}

	function destroy() {
		$progress.remove();
		events.off('projectsAmount', updateProgress);
	}

	return {
		destroy: destroy
	};

})();

// events.on('projectsAmount', function(count) {
// 	alert(count);
// });