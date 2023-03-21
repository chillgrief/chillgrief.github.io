function insertData(id, json)
{
	if (arguments[1]['online'] == true) {
		const template_online = `
		<div class="status-header">
			<h1 class="title"><i class="status online fa fa-circle"></i> ${arguments[1]['host']}:${arguments[1]['port']}</h1>
			<h2 class="subtitle">${arguments[1]['motd']['clean']}</h2>
		</div>

		<div class="status-list">
			<div class="label"><i class="fa fa-server"></i> Server stats</div>
			<table class="table">
				<tbody>
				<tr>
					<td>Version</td>
					<td>${arguments[1]['version']['name_clean']}</td>
				</tr>
				<tr>
					<td>Protocol</td>
					<td>${arguments[1]['version']['protocol']}</td>
				</tr>
				</tbody>
			</table>
		</div>
		<div class="status-list">
			<div class="players">
				<div class="label"><i class="fa fa-users"></i> Players online</div>
				<div class="bar">
					<progress class="progress" value="${arguments[1]['players']['online']}" max="${arguments[1]['players']['max']}"><?= $this->e($players['percentage']) ?>%</progress>
				</div>
				<div class="amount has-text-centered">${arguments[1]['players']['online']}/${arguments[1]['players']['max']}</div>
			</div>
		</div>
		`;
		var template = document.createElement('div');
		template.className = "section";
		template.innerHTML = template_online;
		document.getElementById(arguments[0]).append(template);
	} else {
		const template_offline = `
		<div class="status-header">
			<h1 class="title"><i class="status offline fa fa-circle"></i> ${arguments[1]['host']}:${arguments[1]['port']}</h1>
			<h2 class="subtitle">Not available</h2>
		</div>

		<div class="status-list">
			<div class="label"><i class="fa fa-warning"></i> Server offline</div>
		</div>
		`;
		var template = document.createElement('div');
		template.className = "section";
		template.innerHTML = template_offline;
		document.getElementById(arguments[0]).append(template);
	}
}
async function fetchData(ip)
{
	var response = await fetch('https://api.mcstatus.io/v2/status/java/' + arguments[0]);
	var data = await response.json();
	data = JSON.stringify(data);
	data = JSON.parse(data);
	return data;
}
async function fetchAddress()
{
	var response = await fetch('server.txt');
	var response_text = response.text();
	console.debug(response_text);
	return response_text;
}
async function fetchServers()
{
	var txt_servers = await fetchAddress();
	var servers = txt_servers.split(",");
	console.debug(servers);

	for (let i = 0; i < servers.length; i++) {
		console.debug(servers[i]);

		var server_json = await fetchData(servers[i]);
		insertData('content', server_json);
	}
}
fetchServers();