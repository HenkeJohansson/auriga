var tasks = (function() {
	var tasks = ['Lägg till ;', 'Uppdatera Permalinks'];

		var $el = $('#tasksModule'),
			$btn = $el.find('button#addTask'),
			$input = $el.find('input'),
			$ul = $el.find('ul#tasks'),
			template = $el.find('#tasks-template').html();
		
		$btn.on('click', addTask);
		$ul.delegate('i.del', 'click', deleteTask);

		_render();

		function _render() {
			$ul.html(Mustache.render(template, {tasks: tasks}));
			events.emit('completedTasksChanged', tasks.length);
		}
		
		function addTask(value) {
			var task = (typeof value === 'string') ? value : $input.val();
			tasks.push(task);
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
			tasks.splice(i, 1);
			_render();
		}

		return {
			addTask: addTask,
			deleteTask: deleteTask
		};
})();