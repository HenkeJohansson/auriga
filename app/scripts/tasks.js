var tasks = (function() {
	
	var tasksModule = [
		{
			id: 'venus',
			tasks: ['Lägg till ;', 'Uppdatera Permalinks']
		},
		{
			id: 'jupiter',
			tasks: ['ladda upp filen', 'spara om scriptet']
		},
		{
			id: 'mars',
			tasks: ['kolla stackoverflow', 'slit ut håret']
		},
		{
			id: 'saturnus',
			tasks: ['skit i det här', 'gå hem']
		}
	];

	var $el = $('#tasksModule'),
		$btn = $el.find('button#addTask'),
		$input = $el.find('input'),
		$ul = $el.find('ul#tasks'),
		template = $el.find('#tasks-template').html();
	
	$btn.on('click', addTask);
	$ul.delegate('i.del', 'click', deleteTask);

	_render();

	function _render() {
		$ul.html(Mustache.render(template, {tasks: tasksModule[0].tasks}));
		events.emit('completedTasks', tasksModule[0].tasks.length);
	}
	
	function addTask(value) {
		var task = (typeof value === 'string') ? value : $input.val();
		tasksModule[0].tasks.push(task);
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
		tasksModule[0].tasks.splice(i, 1);
		_render();
	}

	return {
		addTask: addTask,
		deleteTask: deleteTask
	};
})();