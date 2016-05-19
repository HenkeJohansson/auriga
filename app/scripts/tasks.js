var tasksModule = (function() {
	
	var projects = [
		{
			name: 'Venus',
			id: 'venus',
			status: 'backlog',
			color: 'blue',
			tasksList: ['Lägg till ;', 'Uppdatera Permalinks']
		},
		{
			name: 'Jupiter',
			id: 'jupiter',
			status: 'backlog',
			color: 'red',
			tasksList: ['ladda upp filen', 'spara om scriptet']
		},
		{
			name: 'Mars',
			id: 'mars',
			status: 'backlog',
			color: 'green',
			tasksList: ['kolla stackoverflow', 'slit ut håret']
		},
		{
			name: 'Saturnus',
			id: 'saturnus',
			status: 'backlog',
			color: 'yellow',
			tasksList: ['skit i det här', 'gå hem']
		}
	];

	var $el = $('#tasksModule'),
		$btn = $el.find('button#addTask'),
		$input = $el.find('input'),
		$ul = $el.find('ul#tasks'),
		template = $el.find('#tasks-template').html();
	
	$btn.on('click', addTask);
	$ul.delegate('i.del', 'click', deleteTask);

	_render(getUrlParam);

	function _render(getUrlParam) {
		var currProj = getUrlParam();
		console.log('_render', currProj);
		// $ul.html(Mustache.render(template, {tasks: tasks[0].tasksList}));
		// events.emit('completedTasks', tasks[0].tasksList.length);
		$ul.html(Mustache.render(template, {proj: currProj}));
		events.emit('completedTasks', currProj.task.length);
	}
	
	function addTask(value) {
		var task = (typeof value === 'string') ? value : $input.val();
		projects[0].tasksList.push(task);
		_render();
		$input.val('');
	}
	
	function deleteTask(event) {
		var i;
		if (typeof event === 'number') {
			i = event;
		} else {
			var $remove = $(event.target).closest('li');
			i = $ul.find('li').index($remove);
		}
		projects[0].tasksList.splice(i, 1);
		_render();
	}

	function getUrlParam() {
		var currProj = {},
			sPageUrl = window.location.search.substring(1);
			
		currProj.sProjId = sPageUrl.substring(sPageUrl.length, 7);

		for ( var i = 0; i < projects.length; i++ ) {
			if ( currProj.sProjId === projects[i].id ) {
				currProj.project = projects[i];
				// return taskId;
			}
		}

		return currProj;
	}

	return {
		addTask: addTask,
		deleteTask: deleteTask
	};
})();