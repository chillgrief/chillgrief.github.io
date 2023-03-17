function insertData(id, json, name, description)
{
	if (arguments[1]['online'] == true) {
		const template_online = `
	<div class="status-header">
		<h1 class="title"><i class="status online fa fa-circle"></i> ${arguments[2]}</h1>
		<h2 class="subtitle">${arguments[3]}</h2>
	</div>

	<div class="status-list">
		<div class="label"><i class="fa fa-server"></i> Статистика сервера</div>
		<table class="table">
			<tbody>
			<tr>
				<td>Версия</td>
				<td>${arguments[1]['version']['name_clean']}</td>
			</tr>
			<tr>
				<td>Протокол</td>
				<td>${arguments[1]['version']['protocol']}</td>
			</tr>
			</tbody>
		</table>
	</div>
	<div class="status-list">
		<div class="players">
			<div class="label"><i class="fa fa-users"></i> Игроков онлайн</div>
			<div class="bar">
				<progress class="progress" value="${arguments[1]['players']['online']}" max="${arguments[1]['players']['max']}"><?= $this->e($players['percentage']) ?>%</progress>
			</div>
			<div class="amount has-text-centered">${arguments[1]['players']['online']}/${arguments[1]['players']['max']}</div>
		</div>
	</div>
	`;
		document.getElementById(arguments[0]).innerHTML = template_online;
	} else {
		const template_offline = `
	<div class="status-header">
		<h1 class="title"><i class="status offline fa fa-circle"></i> ${arguments[2]}</h1>
		<h2 class="subtitle">Недоступно</h2>
	</div>

	<div class="status-list">
		<div class="label"><i class="fa fa-warning"></i> Сервер недоступен</div>
		<table class="table">
			<tbody>
			<tr>
				<td>Версия</td>
				<td>Недоступно</td>
			</tr>
			<tr>
				<td>Протокол</td>
				<td>Недоступно</td>
			</tr>
			</tbody>
		</table>
	</div>
	`;
		document.getElementById(arguments[0]).innerHTML = template_offline;
	}
}
async function fetchData(ip)
{
	let response = await fetch('https://api.mcstatus.io/v2/status/java/' + arguments[0]);
	let data = await response.json();
	data = JSON.stringify(data);
	data = JSON.parse(data);
	return data;
}
async function fetchServers()
{
	let server_proxy = await fetchData('d18.gamely.pro:20546');
	let server_hub = await fetchData('f5.gamely.pro:29369');
	let server_1 = await fetchData('d9.gamely.pro:20762');
	let server_2 = await fetchData('d9.gamely.pro:20729');
  
	insertData('server_proxy', server_proxy, "Прокси сервер", "Прокси связывает все остальные сервера");
	insertData('server_hub', server_hub, "Лобби", "Наше лобби, в которое вы обычно попадаете (/server hub)");
	insertData('server_1', server_1, "Сервер #1", "Первый гриферский сервер (/server server1)");
	insertData('server_2', server_2, "Сервер #2", "Второй гриферский сервер (/server server2)");
  
	//console.debug("Proxy Status: " + server_proxy['online']);
	//console.debug("Hub Status: " + server_hub['online']);
	//console.debug("Grief #1 Status: " + server_1['online']);
	//console.debug("Grief #2 Status: " + server_2['online']);
}
fetchServers();