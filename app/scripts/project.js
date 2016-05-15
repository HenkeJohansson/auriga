var project = (function() {
	var projects = [
		{
			name: 'Venus',
			id: 'venus',
			status: 'backlog',
			color: 'blue'
		},
		{
			name: 'Jupiter',
			id: 'jupiter',
			status: 'backlog',
			color: 'red'
		},
		{
			name: 'Mars',
			id: 'mars',
			status: 'backlog',
			color: 'green'
		},
		{
			name: 'Saturnus',
			id: 'saturnus',
			status: 'backlog',
			color: 'yellow'
		}
	];

	var $el = $('#projectsModule'),
		$btn = $el.find('button#addProject'),
		$input = $el.find('input'),
		$projCont = $el.find('#projects-container'),
		template = $el.find('#projects-template').html();

	$btn.on('click', addProject);
	$projCont.delegate('i.del', 'click', deleteProject);

	_render();

	function _render() {
		$projCont.html( Mustache.render(template, {projects: projects}) );
		events.emit('projectsAmount', projects.length);
	}

	function addProject(value) {
		var projectName = (typeof value === 'string') ? value : $input.val();
		var project = {
			name: projectName,
			id: projectName.toLowerCase(),
			status: 'backlog',
			color: randomizeColor()

		};
		projects.push(project);
		_render();
		$input.val('');
	}

	function randomizeColor() {
		var colors = ['blue', 'purple', 'red', 'orange', 'yellow', 'green'];
		var randomColor = colors[Math.floor(Math.random()*colors.length)];
		return randomColor;
	}

	function deleteProject() {
		var i;
		if (typeof event === 'number') {
			i = event;
		} else {
			var $remove = $(event.target).closest('div');
			i = $projCont.find('div').index($remove);
		}
		projects.splice(i, 1);
		_render();
	}
	console.log('soppa');

	return {
		addProject: addProject,
		deleteProject: deleteProject,
		projects: projects
	};
})();